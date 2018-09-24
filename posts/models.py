from django.db import models
from django.utils import timezone
from accounts.models import User

# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=400)
    slug = models.SlugField(blank=True, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    published_at = models.DateTimeField(blank=True, null=True)
    image = models.ImageField(upload_to='posts/image')
    music = models.FileField(upload_to='posts/music', blank=True, null=True)
    music_title = models.CharField(max_length=150, blank=True, null=True)
    location = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return self.title
    
    def publish(self):
        self.published_at = timezone.now()

    def unpublish(self):
        self.published_at = None

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return self.content
    

from .utils import unique_slug_generator
from django.db.models.signals import pre_save

def pre_save_post_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        # instance.slug = create_slug(instance)
        instance.slug = unique_slug_generator(instance)



pre_save.connect(pre_save_post_receiver, sender=Post)
