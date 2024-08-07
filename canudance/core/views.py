import base64
import tempfile
from django.core.files.base import ContentFile
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import os
from dotenv import load_dotenv
import google.generativeai as genai
from PIL import Image
from . import models
from . import serializers
import json

def base64_to_png(base64_string, output_file_path):
    # Ensure that the base64 string is properly padded
    base64_string += '=' * (-len(base64_string) % 4)
    
    try:
        # Decode the base64 string
        image_data = base64.b64decode(base64_string)

        # Write the binary data to a file
        with open(output_file_path, 'wb') as f:
            f.write(image_data)
        print(f"Image saved to {output_file_path}")
    except (base64.binascii.Error, ValueError) as e:
        print(f"Error decoding base64 string: {e}")

class ImageSnapShotUploadView(APIView):
    def get(self, request, format=None):
        queryset = models.ImageSnapshot.objects.all()
        serializer = serializers.ImageSnapShotSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = serializers.ImageSnapShotSerializer(data=request.data)
        data = serializer.initial_data
        data['dancer_image'] = data.get('modelImage', data.get('dancer_image'))
        data['customer_image'] = data.get('userImage', data.get('customer_image'))
        serializer.initial_data['dance_sequence'] = 1

        if serializer.is_valid():
            serializer.save()
            model_image_base64 = serializer.validated_data.get('dancer_image')
            user_image_base64 = serializer.validated_data.get('customer_image')

            try:
                with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as model_file, \
                     tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as user_file:
                    
                    base64_to_png(model_image_base64, model_file.name)
                    base64_to_png(user_image_base64, user_file.name)

                    load_dotenv()
                    api_key = os.getenv("API_KEY")
                    genai.configure(api_key=api_key)

                    framed = model_file.name
                    frameu = user_file.name

                    model = genai.GenerativeModel(model_name="gemini-1.5-pro", 
                                                  generation_config={"response_mime_type": "application/json"})
                    prompt = """The two people are having a dance competition. 
                    The cartoon model is leading and the person is trying to follow along. 
                    Give a number from 0-10 (besides) on how well the person in the room is following along. 
                    Make assumptions if necessary. Also can you provide a bit of feedback to the person 
                    on the right on how they can fix their position to match the leader. 

                    Using this JSON schema:
                        FeedbackItem = {"score": int, 
                        'feedback': str
                        }
                    Return a `FeedbackItem`
                    """
                    response = model.generate_content([
                        framed, frameu,
                        prompt
                    ])
                    prompt_content = response.text
                    json_content = json.loads(prompt_content)
                    print(json_content)
                    print(json_content.keys())

                    # Clean up temporary files
                    serializer.save(score=json_content['score'], feedback=json_content['feedback'])

                os.remove(framed)
                os.remove(frameu)

            except Exception as e:
                print(f"Error processing images: {e}")
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ClearImageSnapshotsView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            models.ImageSnapshot.objects.all().delete()
            return Response({"message": "All image snapshots have been deleted."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)