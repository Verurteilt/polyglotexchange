from django.db import models

# Create your models here.

class Language(models.Model):
	language = models.CharField(max_length=100, primary_key=True, db_index=True)
	abbreviation = models.CharField(max_length=10)
	flag = models.FileField(upload_to="flags/")

	 
	def __unicode__(self):
		return self.language  + " - " +  self.abbreviation