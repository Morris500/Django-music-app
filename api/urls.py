from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom


urlpatterns = [
    path('', RoomView.as_view()),
    path('', CreateRoomView.as_view(), name='create-room'),
    path('get-room', GetRoom.as_view())
]

