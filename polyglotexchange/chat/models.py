from django.db import models

# Create your models here.

class ChatGroup(models.Model):
	group_id = models.CharField(max_length=20, primary_key=True)
	from_language = models.ForeignKey('languages.Language', related_name="from_language")
	to_language = models.ForeignKey('languages.Language', null=True, related_name="to_language")
	available = models.BooleanField(default=True)

	def __unicode__(self):
		return self.to_language.language  + " - " + self.from_language.language

	def group(self):
		return self.__unicode__()
