from django.db import models

# Create your models here.

class ChatGroup(models.Model):
	from_language = models.ForeignKey()
	to_language = models.ForeignKey(null=True)