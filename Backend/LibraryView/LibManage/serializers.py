from rest_framework import serializers
from .models import Book
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    class Meta:
        model = Book
        fields = '__all__'