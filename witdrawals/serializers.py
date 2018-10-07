from rest_framework import serializers
from .models import Witdraw
from accounts.models import User

class WitdrawalSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Witdraw
        fields = [
            'id', 'email', 'user', 'referral_allowance',
            'read_allowance', 'comment_allowance', 'date', 'bank_account_no',
            'bank_account_name', 'referral_allowance', 'read_allowance',
            'comment_allowance', 'username', 'bank_name',
        ]
        extra_kwargs = {
            "date": {"read_only": True},
        }
    
    def get_username(self, obj):
        return obj.user.username
