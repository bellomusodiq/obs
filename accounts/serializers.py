from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import User, CuponCode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
import string, random
from django.core.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
    def gen_token(self):
        choices = string.ascii_letters + string.digits + string.hexdigits
        gen = ''
        for i in range(10):
            gen += random.choice(choices)
        return gen
    class Meta:
        model = User
        fields = (
            'id', 'email', 'username', 'firstname', 'lastname',
            'referral_allowance', 'read_allowance', 'comment_allowance', 'referral_code',
            'is_admin', 'is_active', 'password', 'cupon_code'
        )
        read_only_fields = ('last_login','activation_token', 'is_active')
        extra_kwargs = {
            'password': {'write_only': True},
            'referral_allowance': {'read_only': True},
            'read_allowance': {'read_only': True},
            'referral_code': {'read_only': True},
            }
    

    def create(self, validated_data, *args, **kwargs):
        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
            firstname = validated_data['firstname'],
            lastname = validated_data['lastname'],
            cupon_code = validated_data['cupon_code'],
            referral_code = self.gen_token()
        )
        user.set_password(validated_data['password'])
        user.save()
        if not user.is_admin:
            cupon_code = validated_data['cupon_code']
            if(cupon_code in [user.referral_code for user in User.objects.filter(is_admin=False).exclude(pk=user.pk)]):
                user_obj = User.objects.get(referral_code=cupon_code)
                user_obj.referral_allowance = float(user_obj.referral_allowance) + 200
                user_obj.save()
            if(cupon_code in [cupon_code.code for cupon_code in CuponCode.objects.all()]):
                user.referral_allowance = float(user.referral_allowance) + 500
                CuponCode.objects.get(code=cupon_code).delete()
                user.save()
        return user

class UserLoginSerializer(serializers.ModelSerializer):
    token = serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.CharField()
    class Meta:
        fields = [
            'username',
            'password',
            'email',
            'token',
            'id',
            'is_active',
            'is_admin',
        ]
        model = User
        extra_kwargs = {
            "password": {"write_only": True}, 
            "email": {"read_only": True},
            "is_active": {"read_only": True},  
            "is_admin": {"read_only": True},  
            "id": {"read_only": True},  
        }

    def validate(self, data):
        username = data.get('username', None)
        password = data['password']
        if not username:
            raise ValidationError('A username is required to login')
        user = User.objects.get(username=username)
        if not user:
            raise ValidationError('the username is not valid')
        if(user):
            if not user.check_password(password):
                raise ValidationError('Incorrect Credential please try again')
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        data['token'] = token
        data['id'] = user.id
        return data


class CuponCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuponCode
        fields = ['id', 'code']
    extra_kwargs = {
        "code": {"read_only": True},
    }