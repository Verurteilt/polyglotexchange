from django.db import models
from djangotoolbox.fields import ListField

# Create your models here.

class MessageChat(models.Model):
	message = models.TextField()
	from_user = models.CharField(max_length=25)
	to_group = models.CharField(max_length=25, null=True)
	to_users = ListField()
	seen = models.BoleanField(default=False)
	seen_at = models.DateTimeField(null=True)