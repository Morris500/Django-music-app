from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
# def main(req):
#     return

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post (self, req, format=None):
        if not req.session.exists(req.session.session_key):
            req.session.create()

        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            guest_can_pause = serializer.validated_data.get('guest_can_pause')
            votes_to_skip = serializer.validated_data.get('votes_to_skip')
            host = req.session.session_key
            queryset = Room.objects.filter(host=host) 
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip']) 

            else:
                room = Room(host=host, guest_can_pause = guest_can_pause, votes_to_skip = votes_to_skip )              

                room.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)