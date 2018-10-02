from rest_framework import serializers
from .models import Post, Category, Comment, Location, Trending
from accounts.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class TrendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trending
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id', 'post', 'content', 'username', 'author'
        ]
    def get_username(self, obj):
        return obj.author.username


class PostSerializer(serializers.ModelSerializer):
    author_detail = serializers.SerializerMethodField()
    category_detail = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    location_title = serializers.SerializerMethodField()
    lookup_field = 'slug'
    class Meta: 
        model = Post
        fields = [
            'id', 'slug', 'published_at', 'content', 'category', 'category_detail',
             'title', 'image', 'author', 'author_detail', 'sponsored',
             'music', 'music_title', 'location', 'location_title',
            'comments',
        ]
        extra_kwargs = {
            'url': {'view_name': 'posts', 'lookup_field': 'slug'},
            'created_at': {'read_only': True}
        }

    def get_author_detail(self, obj):
        return UserSerializer(obj.author).data

    def get_category_detail(self, obj):
        return CategorySerializer(obj.category).data
    
    def get_comments(self, obj):
        queryset = Comment.objects.filter(post=obj.id)
        return CommentSerializer(queryset, many=True).data
    
    def get_location_title(self, obj):
        return obj.location.location