from django.db import models
from users.models import User

# Create your models here.

class Todo(models.Model):
    title=models.CharField(max_length=120)
    description=models.CharField(max_length=500)
    completed=models.BooleanField(default=False)
    user = models.ForeignKey(User,default=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    