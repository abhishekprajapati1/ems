from rest_framework import serializers
from .models import Branch

class BranchListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'
        extra_kwargs = {
            'is_active': {'read_only': True},
            'owner': {'read_only': True},
        }
    
    def to_representation(self, instance):
        request = self.context.get('request')
        if request and request.method == 'GET':
            try:
                self.fields.pop('is_deleted')
            except:
                pass
        
        return super().to_representation(instance)

class BranchUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["name", "address", "branch_type", "opening_hours", "contacts"]