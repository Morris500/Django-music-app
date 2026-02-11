from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom, LeaveRoom


urlpatterns = [
    # path('', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view(), name='create-room'),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('Leave_room', LeaveRoom.as_view)
]

