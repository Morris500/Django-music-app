from django.urls import path
from .views import RoomView, CreateRoomView


urlpatterns = [
    # path('', RoomView.as_view()),
    path('', CreateRoomView.as_view(), name='create-room'),
]

