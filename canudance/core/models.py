import os
import random
import string
from django.db import models
from django.core.files.storage import default_storage
from django.utils.deconstruct import deconstructible

'''
def generate_random_filename(extension='', length=8):
    """Generate a random filename with the given extension and length."""
    characters = string.ascii_letters + string.digits
    random_name = ''.join(random.choice(characters) for _ in range(length))
    return f"{random_name}{extension}"

@deconstructible
class RandomFilenameStorage(models.Storage):
    """Custom storage class to handle random filenames."""
    def _save(self, name, content):
        extension = os.path.splitext(name)[1]
        random_name = generate_random_filename(extension)
        return super()._save(random_name, content)

class Image(models.Model):
    image = models.ImageField(upload_to='media/', storage=RandomFilenameStorage())
    
    def save(self, *args, **kwargs):
        if self.image and hasattr(self.image, 'name'):
            # Generate a new name if the file has changed or a new image is being saved
            extension = os.path.splitext(self.image.name)[1]
            new_name = generate_random_filename(extension)
            self.image.name = new_name
        super().save(*args, **kwargs)'''

class DanceSequence(models.Model):
    name = models.CharField(default="", max_length=255)
    grade = models.FloatField()
    end_photo = models.ImageField(upload_to="media/")

class ImageSnapshot(models.Model):
    dancer_image = models.TextField() # in base64 format (string)
    customer_image = models.TextField() # in base64 format (string)
    dance_sequence = models.ForeignKey(DanceSequence, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    feedback = models.TextField(default="-", max_length=755)






