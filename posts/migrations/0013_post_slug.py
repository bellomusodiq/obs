# Generated by Django 2.1 on 2018-09-23 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0012_post_music_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
    ]
