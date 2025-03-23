from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    Description = models.TextField(blank=True)
    Image = models.ImageField(upload_to='media/',blank=True)

    def __str__(self):
        return self.title