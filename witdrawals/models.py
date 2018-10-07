from django.db import models
from accounts.models import User

# Create your models here.
class Witdraw(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField()
    date = models.DateField(auto_now_add=True)
    bank_account_no = models.PositiveIntegerField()
    bank_name = models.CharField(max_length=240)
    bank_account_name = models.CharField(max_length=240)
    referral_allowance = models.DecimalField(default=0, decimal_places=2, max_digits=200)
    read_allowance = models.DecimalField(default=0, decimal_places=2, max_digits=200)
    comment_allowance = models.DecimalField(default=0, decimal_places=2, max_digits=200)

    def __str__(self):
        return self.user.username

    class Meta:
        ordering = ['-date']
