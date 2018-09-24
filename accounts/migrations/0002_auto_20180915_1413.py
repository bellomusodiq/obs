# Generated by Django 2.1 on 2018-09-15 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='profile_image',
        ),
        migrations.AddField(
            model_name='user',
            name='cupon_code',
            field=models.CharField(default=1, max_length=10, verbose_name='cupon code'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='referral_code',
            field=models.CharField(default=1, max_length=10, verbose_name='referral code'),
            preserve_default=False,
        ),
    ]
