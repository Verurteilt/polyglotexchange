from django.db import models

# Create your models here.

class Fav(models.Model):
	question = models.ForeignKey(Question)
	user = models.ForeignKey('users.User')



class Question(models.Model):
	question = models.CharField(max_length=250)
	body = models.TextField()
	owner = models.ForeignKey('users.User')
	upvotes = models.IntegerField()
	downvotes = models.IntegerField()
	created = models.DateTimeField(auto_now_add=True)
	last_edited = models.DateTimeField(auto_now_add=True)



class Answer(models.Model):
	body = models.TextField(max_length=250)
	owner = models.ForeignKey('users.User')
	question = models.ForeignKey('Question')
	accepted = models.BooleanField(default=False)
	created = models.DateTimeField(auto_now_add=True)
	last_edited = models.DateTimeField(auto_now_add=True)
