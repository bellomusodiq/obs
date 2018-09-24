from django.db import models
from accounts.models import User
# Create your models here.
class Widrawal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    read_allowance = models.DecimalField(max_digits=20, decimal_places=2)
    referral_allowance = models.DecimalField(max_digits=20, decimal_places=2)
    bank_name = models.CharField(max_length=120)
    bank_account_no = models.PositiveIntegerField()
    bank_account_name = models.CharField(max_length=240)

    def __str__(self):
        return self.user.username

class SiteSettings(models.Model):
    promote_instagram = models.CharField(max_length=120)
    promote_twitter = models.CharField(max_length=120)
    activate_witdrawal = models.BooleanField(default=True)

    def __str__(self):
        return 'site settings'

class PhoneNumber(models.Model):
    site_settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    number = models.CharField(max_length=120)

    def __str__(self):
        return self.number