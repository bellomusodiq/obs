# Generated by Django 2.1 on 2018-09-20 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0009_auto_20180920_2219'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='music',
            field=models.FileField(upload_to='posts/music'),
        ),
    ]
