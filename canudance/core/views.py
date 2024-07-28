from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from . import models
from . import serializers


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

    def get(self, request, format=None):
        queryset = models.ImageSnapshot.objects.all()
        serializer = serializers.ImageSnapShotSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = serializers.ImageSnapShotSerializer(data=request.data)
        # print(serializer.initial_data)
        serializer.initial_data['dancer_image'] = serializer.initial_data['modelImage']
        serializer.initial_data['customer_image'] = serializer.initial_data['userImage']
        serializer.initial_data['dance_sequence'] = 1


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # print(serializer.error_messages)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)