# Generated by Django 2.1 on 2018-09-23 11:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Widrawal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('read_allowance', models.DecimalField(decimal_places=2, max_digits=20)),
                ('referral_allowance', models.DecimalField(decimal_places=2, max_digits=20)),
                ('bank_name', models.CharField(max_length=120)),
                ('bank_account_no', models.PositiveIntegerField()),
                ('bank_account_name', models.CharField(max_length=240)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
