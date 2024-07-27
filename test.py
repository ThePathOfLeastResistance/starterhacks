# # pip install pillow

# from PTL import ImageGrab

# screenshot_frame = ImageGrab.grab(bbox=(100,100,500,500))

# screenshot_frame.save("screenshot.png")
import google.generativeai as genai


# upload the photo
frame = genai.upload_file(path="screenshot.png", display_name="screenshot")
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
response = model.generate_content([frame, "Describe how this product might be manufactured."])

print(response.text)