from django.db import models

# Create your models here.

class Fav(models.Model):
	question = models.ForeignKey(Question)
	user = models.ForeignKey('users.User')





class Question(models.Model):
	question = models.CharField(max_length=250)
	body = models.TextField(max_length=250)
	owner = models.ForeignKey('users.User')
	upvotes = models.IntegerField()
	downvotes = models.IntegerField()
	created = models.DateTimeField(auto_now_add=True)

