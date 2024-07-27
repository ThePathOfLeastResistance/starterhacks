from django.urls import path
from . import views



urlpatterns = [
    path("", views.home), 
    path('upload/', views.ImageUploadView.as_view(), name='image-upload'),

]