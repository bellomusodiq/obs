from django.db import models

# Create your models here.
class Ad(models.Model):
    title = models.CharField(max_length=240)
    image = models.ImageField(upload_to='image/ads')

    def __str__(self):
        return self.title