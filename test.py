# # pip install pillow

# from PTL import ImageGrab

# screenshot_frame = ImageGrab.grab(bbox=(100,100,500,500))

# screenshot_frame.save("screenshot.png")

# do pip install -q -U google-generativeai

import google.generativeai as genai
import os 
import json
from dotenv import load_dotenv

load_dotenv()

api_keysadf = os.getenv("api_key") 

print(api_keysadf)

genai.configure(api_key=api_keysadf)


# upload the photo
frame = genai.upload_file(path="image.png", display_name="screenshot")
print("file compeletly uploaded")



# see if the file was stored correctly 
try:
    file = genai.get_file(name = frame.name)
    print("file was stored")
except:
    print("file was not stored ")
    
# Choose a Gemini model.
model = genai.GenerativeModel(model_name="gemini-1.5-pro")

# Prompt the model with text and the previously uploaded image.
response = model.generate_content([frame, "The two people are having a dance competition. The person on the left is leading and the person on the right is trying to follow along. Give a number from 0-10 on how well the person on the right is following along. Make assumptions if necessary. Also can you provide a bit of feedback to the person on the right on how they can fix their position to match the leader. Give us a JSON object with ONLY this structure: '{'score': [score], 'feedback': [feedback]}.' No explanation is needed and the word json does not need to be mentioned."])

# Delete them after use.
genai.delete_file(frame.name)
print(f'Deleted file {frame.uri}')


print(f"{json.loads(response.text.replace("'", '"'))}")