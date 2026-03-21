from django.shortcuts import render, redirect
import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status, response
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated
load_dotenv()
from api.models import Room
from .util import *


class AuthURL(APIView):
    def get(self, req, format=None):

        scopes='user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={ 'scope': scopes, 'response_type':'code', 'redirect_uri':os.getenv('REDIRECT_URI'), 'client_id':os.getenv('CLIENT_ID')}).prepare().url

        print({'client_id':os.getenv('REDIRECT_URI')})

        return Response({'url':url}, status=status.HTTP_200_OK)

def spotify_callback(req, format=None):
    code = req.GET.get('code')
    error = req.GET.get('error')    

    if error:
        return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)
    
    response = post('https://accounts.spotify.com/api/token',  data={'grant_type':'authorization_code','code': code,'redirect_uri':os.getenv('REDIRECT_URI'),'client_id':os.getenv('CLIENT_ID'),'client_secret': os.getenv('CLIENT_SECRET')}).json()
    
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not req.session.exists(req.session.session_key):
        req.session.create()

    update_or_create_user_tokens(req.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:')

class ISAuthenticated(APIView):
    def get(self, req, format=None):
        is_authenticated = is_spotify_authenticated(req.session.session_key)

        return Response({'status':is_authenticated}, status=status.HTTP_200_OK)
    
 
class CurrentSong(APIView):
    def get(self, req, format=None):
        room_code = req.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)    
        host = room.host
        endpoint = "player/currently-playing"
        response = excute_spotify_api_request(host, endpoint)

        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')

        artist_string = ''

        for i, artist in enumerate(item.get('artist')):
            if i > 0:
                artist_string += ", "
                name = artist.get('name')
                artist_string += name

        song = {
            'title': item.get('name'),
            'artist':artist_string,
            'duration':duration,
            'time':progress,
            'image_url':album_cover,
            'is_playing':is_playing,
            'votes': 0,
            'id':song_id
        }        

        return response(response, ststus=status.HTTP_200_OK)