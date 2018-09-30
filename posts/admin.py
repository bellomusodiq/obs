from django.contrib import admin
from .models import Post, Category, Comment, Location, Trending
# Register your models here.

admin.site.register(Post)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Location)
admin.site.register(Trending)
