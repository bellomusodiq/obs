from django.db import models
# Create your models here.

class SiteSettings(models.Model):
    contact_us = models.TextField()
    advertise = models.TextField()
    withdraw = models.BooleanField(default=False)

    def __str__(self):
        return 'site settings'
