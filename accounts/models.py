from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
import random
import string
from django.core.validators import validate_comma_separated_integer_list


class UserManager(BaseUserManager):
    def gen_token(self, num=None):
        choices = string.ascii_letters + string.digits + string.hexdigits
        gen = ''
        if num:
            for i in range(num):
                gen += random.choice(choices)
        else:
            for i in range(40):
                gen += random.choice(choices)
        return gen
            

    def create_user(self, username, email, firstname, lastname, cupon_code, referral_code, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not username:
            raise ValueError('User must have a username')
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            firstname=firstname,
            lastname=lastname,
            cupon_code = cupon_code,
            referral_code = self.gen_token(10),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        print(username, email, password)
        user = self.create_user(
            username,
            email,
            password=password,
            firstname='',
            lastname='',
            referral_code='',
            cupon_code='',
        )
        user.is_active = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    
    username = models.CharField(
        verbose_name='username',
        max_length=255,
        unique=True,
    )

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    firstname = models.CharField(
        verbose_name='first name',
        max_length=120)
    lastname = models.CharField(
        verbose_name='last name',
        max_length=120)
    cupon_code = models.CharField(
        max_length=10,
        verbose_name='cupon code',
        blank=True, null=True
    )
    referral_allowance = models.DecimalField(default=0, decimal_places=2, max_digits=200)
    read_allowance = models.DecimalField(default=0, decimal_places=2, max_digits=200)
    comment_allowance = models.DecimalField(default=0, decimal_places=2, max_digits=200)
    referral_code = models.CharField(max_length=10, verbose_name='referral code')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    read = models.TextField(validators=[validate_comma_separated_integer_list], blank=True, null=True)
    comment_on_posts = models.TextField(validators=[validate_comma_separated_integer_list], blank=True, null=True)


    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def get_full_name(self):
        # The user is identified by their email address
        return "{} {}".format(self.firstname, self.lastname)

    def get_short_name(self):
        # The user is identified by their email address
        return self.username

    def __str__(self):              # __unicode__ on Python 2
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class CuponCode(models.Model):
    code = models.CharField(max_length=10)

    def __str__(self):
        return self.code