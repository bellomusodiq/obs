from rest_framework import serializers
from .models import SiteSettings

class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            'id', 'contact_us', 'withdraw', 'advertise'
        ]

