from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import status
from rest_framework.views import APIView
from .models import Image
from .serializers import ImageSerializer

def home(request):
    return render(request, 'index.html')


class ImageUploadView(APIView):
    parser_classes = [FormParser, MultiPartParser]

    def get(self, request, format=None):
        queryset = Image.objects.all()
        serializer = ImageSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)