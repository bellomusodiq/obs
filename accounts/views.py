from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, generics
from .serializers import UserSerializer, CuponCodeSerializer
from .models import User, CuponCode
from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import authentication, permissions
from .serializers import UserLoginSerializer
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
import string
import random
from posts.paginations import SmallResultsSetPagination

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = SmallResultsSetPagination

    def partial_update(self, request, *args, **kwargs):
        change_password=request.GET.get('change_password')
        if(change_password):
            user_obj = request.user
            if user_obj.check_password(request.data['old_password']):
                if request.data['new_password1'] == request.data['new_password2']:
                    user_obj.set_password(request.data['new_password1'])
                    user_obj.save()
                    return Response({'data': 'Password sucessfully updated'}, status=status.HTTP_200_OK)
                else:
                    return Response({'data':'Password do not match'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'data':'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST)

        kwargs['partial'] = True
        if((kwargs['pk'] == request.user.id) or request.user.is_admin):
            user_obj = request.user
            if not request.GET.get('change_password'):
                try:
                    password = request.data['checkpassword']
                    if user_obj.check_password(request.data['checkpassword']):
                        return self.update(request, *args, **kwargs)
                    else:
                        return Response({'data':'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST)
                except:
                    pass

class UserCreate(APIView):
    def get(self, request):
        return Response({'working': 'okay'})
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivateView(APIView):
    def get(self, request):
        token = request.GET.get('u_t')
        user = User.objects.get(activation_token=token)
        if user:
            user.is_active = True
            user.save()
            return Response({"message":"your account has been activated"}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid url"}, status=status.HTTP_400_BAD_REQUEST)

class ForgotPassword(APIView):
    def get(self, request):
        username = request.GET.get('username')
        if username:
            user = User.objects.get(username=username)
            if user:
                current_site = 'localhost:8000'
                mail_subject = 'Reset your password.'
                message = render_to_string('acc_active_email.html', {
                    'type': 'reset',
                    'user': user.username,
                    'domain': current_site,
                    'token':user.activation_token,
                })
                to_email = user.email
                email = EmailMessage(
                            mail_subject, message, to=[to_email]
                )
                email.send()
            return Response({"message":"A reset email has been sent to your email"}, status=status.HTTP_200_OK)
        if request.GET.get('u_t'):
            user = User.objects.get(activation_token=request.GET.get('u_t'))
            if user:
                return Response({'Reset your password'}, status=status.HTTP_200_OK)
            else:
                return Response({'message', 'invalid url'},status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Username does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    def post(self, request):
        token = request.GET.get('u_t')
        password = request.data['password']
        if(token):
            user = User.objects.get(activation_token=token)
            user.set_password(password)
            user.save()
            return Response({'message': 'password successfully changed'},status.HTTP_200_OK)
        return Response({'message', 'invalid url'},status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    permissions_class = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        username = data['username']
        user_obj = None
        try:
            user_obj = User.objects.get(username=username)
        except:
            pass
        if not user_obj:
            return Response({'non_field_errors':['invalid username, username does not exist']}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            new_data['isActive'] = user_obj.is_active
            new_data['isAdmin'] = user_obj.is_admin
            return Response(new_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class GenerateCupon(APIView):
    def gen_token(self):
        choices = string.ascii_letters + string.digits + string.hexdigits
        gen = ''
        for i in range(10):
            gen += random.choice(choices)
        return gen
    def get(self, request):
        number = request.GET.get('no')
        cupon_codes = []
        for i in range(int(number)):
            cupon_code = CuponCode.objects.create(
                code = self.gen_token()
            )
            cupon_code.save()
            cupon_codes.append(cupon_code.code)
        return Response(cupon_codes, status=status.HTTP_200_OK)

class CuponCodeViewSet(viewsets.ModelViewSet):
    serializer_class = CuponCodeSerializer
    queryset = CuponCode.objects.all()
