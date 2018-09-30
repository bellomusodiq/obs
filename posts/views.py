from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Category, Comment, Location
from .serializers import PostSerializer, CategorySerializer, CommentSerializer, LocationSerializer
from ologytalks.permissions import IsAdminOrReadOnly, IsOwnerOrAdminOrReadOnly, IsRegularUser
# Create your views here.

class PostViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly, ]
    serializer_class = PostSerializer
    lookup_field = 'slug'
    def get_queryset(self):
        queryset = Post.objects.all()
        drafts = self.request.GET.get('drafts')
        if(drafts):
            queryset = queryset.filter(published_at__isnull=True)
        published = self.request.GET.get('published')
        if published: 
            queryset = queryset.filter(published_at__isnull=False)
        category = self.request.GET.get('category')
        if(category):
            queryset = queryset.filter(category__title=category)
        location = self.request.GET.get('location')
        if(location):
            queryset = queryset.filter(location=location)
        q = self.request.GET.get('q')
        if q:
            queryset = queryset.filter(title__icontains=q)
        return queryset

class ReadPost(APIView):
    permission_classes = [IsRegularUser]
    def get(self, request):
        user = request.user
        post = request.GET.get('post')
        new_post_add = ''
        if user.read:
            if not post in user.read.split(','):
                new_post_add = user.read+','+post
                user.read = new_post_add
                user.read_allowance = float(user.read_allowance) + 2
                user.save()
        else:
            new_post_add = post
            user.read = new_post_add
            user.read_allowance = float(user.read_allowance) + 2
            user.save()
        return Response('Read')

class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class LocationViewSet(ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()


class CommentViewSet(ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class CommentPost(APIView):
    permission_classes = [IsRegularUser]
    def get(self, request):
        user = request.user
        post = request.GET.get('post')
        new_post_add = ''
        if user.comment_on_posts:
            if not post in user.comment_on_posts.split(','):
                new_post_add = user.comment_on_posts+','+post
                user.comment_on_posts = new_post_add
                user.comment_allowance = float(user.comment_allowance) + .5
                user.save()
        else:
            new_post_add = post
            user.comment_on_posts = new_post_add
            user.comment_allowance = float(user.comment_allowance) + .5
            user.save()
        return Response('Read')

class MakeWidrawal(APIView):
    permission_classes = [IsRegularUser]
    def get(self, request):
        user = request.user
        post = request.GET.get('post')
        if not post in user.read.split(','):
            new_post_add = ''
            if(user.read):
                new_post_add = user.read+','+post
            else:
                new_post_add = post
            user.read = new_post_add
            user.read_allowance = float(user.read_allowance) + 2
            user.save()
        return Response('Read')
