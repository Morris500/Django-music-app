from django.urls import path
from .views import AuthURL, spotify_callback, ISAuthenticated

urlpatterns = [
    path('get-auth', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is_authenticated', ISAuthenticated.as_view()),
]