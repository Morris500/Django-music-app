from django.shortcuts import render

# Create your views here.
def index(req, *agr, **kwargs):
    return render(req, "frontend/index.html")