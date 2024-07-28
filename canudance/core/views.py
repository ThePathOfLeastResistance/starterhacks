from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *

def home(request):
    return render(request, 'index.html')


'''class DancerImageUploadView(APIView):
    parser_classes = [FormParser, MultiPartParser]

    def get(self, request, format=None):
        queryset = DancerImage.objects.all()
        serializer = DancerImageSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = DancerImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''

class ImageSnapShotUploadView(APIView):
    parser_classes = [FormParser, MultiPartParser]

    def get(self, request, format=None):
        queryset = ImageSnapshot.objects.all()
        serializer = ImageSnapShotSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ImageSnapShotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)