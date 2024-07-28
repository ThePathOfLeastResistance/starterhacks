from django.urls import path
from . import views



urlpatterns = [
    path("", views.home), 
    path("upload/image-snapshot", views.ImageSnapShotUploadView.as_view())

]