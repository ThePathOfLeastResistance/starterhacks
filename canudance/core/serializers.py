from .models import *
from rest_framework import serializers


class ImageSnapShotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageSnapshot
        fields = ['dancer_image', 'customer_image', 'dance_sequence']


class DanceSequenceSerializer(serializers.ModelSerializer):

    image_snapshots = ImageSnapShotSerializer(many=True, read_only=True)

    class Meta:
        model = DanceSequence
        fields = ['name', 'grade', 'score', 'image_snapshots']