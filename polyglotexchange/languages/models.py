from django.db import models

# Create your models here.

class Language(models.Model):
	language = models.CharField(max_length=100, primari_key=True, db_index=True)

	def __unicode__(self):
		return self.language