from django.db import models

# Create your models here.

class ChatGroup(models.Model):
	from_language = models.ForeignKey('languages.Language')
	to_language = models.ForeignKey('languages.Language', null=True)