# Generated by Django 2.1 on 2018-10-07 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('witdrawals', '0006_auto_20181007_1204'),
    ]

    operations = [
        migrations.AddField(
            model_name='witdraw',
            name='bank_name',
            field=models.CharField(default='gtb', max_length=240),
            preserve_default=False,
        ),
    ]