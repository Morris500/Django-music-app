from django.shortcuts import render, redirect
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status, response
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated


class AuthURL(APIView):
    def get(self, req, format=None):

        scopes='user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', param={ 'scope': scopes, 'response_type':'code', 'redirect_url':os.getenv('REDIRECT_URI'), 'client_id':os.getenv('CLIENT_ID')}).prepare().url

        return Response({'url':url}, status=status.HTTP_200_OK)

def spotify_callback(req, format=None):
    code = req.GET.get('code')
    error = req.GET.get('error')    

    response = post('http//accounts.spotify.com/api/token',  data={'grant_type':'authorization_code','code': code,'redirect_url':os.getenv('REDIRECT_URI'),'Client_id':os.getenv('CLIENT_ID'),'client_secret': os.getenv('CLIENT_SECRET')}).json()
    
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expire_in')
    error =response.get('error')

    if not req.session.exists(req.session.session_key):
        req.session.create()

    update_or_create_user_tokens(req.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:')

class ISAuthenticated(APIView):
    def get(self, req, format=None):
        is_authenticated = is_spotify_authenticated(req.session.session_key)

        return Response({'status':is_authenticated}, sataus=status.HTTP_200_OK)
 