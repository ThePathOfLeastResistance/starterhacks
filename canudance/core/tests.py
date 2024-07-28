from django.test import TestCase

import google.generativeai as genai
import PIL.Image
import os

genai.configure(api_key=os.getenv("API_KEY"))
img = PIL.Image.open('/media/tom_zhang_portrait-BC9HdXVj.webp')

model = genai.GenerativeModel(model_name="gemini-1.5-flash")
response = model.generate_content(["What is in this photo?", img])
print(response.text)