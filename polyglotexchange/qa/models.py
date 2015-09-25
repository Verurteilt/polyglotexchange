from django.db import models
from qa.managers import QuestionManager
# Create your models here.

class Fav(models.Model):
	question = models.ForeignKey('Question')
	user = models.ForeignKey('users.User')



class Question(models.Model):
	question = models.CharField(max_length=250)
	body = models.TextField()
	owner = models.ForeignKey('users.User')
	upvotes = models.IntegerField()
	downvotes = models.IntegerField()
	created = models.DateTimeField(auto_now_add=True)
	last_edited = models.DateTimeField(auto_now_add=True)
	tags = models.ManyToManyField('tags.Tag', through = 'QuestionTag')
	comments = models.ManyToManyField("Comment", through = "QuestionComment")

	objects = QuestionManager()

class QuestionTag(models.Model):
	tag = models.ForeignKey('tags.Tag')
	question = models.ForeignKey(Question)


class Answer(models.Model):
	body = models.TextField(max_length=250)
	owner = models.ForeignKey('users.User')
	question = models.ForeignKey('Question')
	accepted = models.BooleanField(default=False)
	created = models.DateTimeField(auto_now_add=True)
	last_edited = models.DateTimeField(auto_now_add=True)
	comments = models.ManyToManyField("Comment", through = "AnswerComment")


class Comment(models.Model):
	owner = models.ForeignKey('users.User')
	comentario = models.TextField()
	created = models.DateTimeField(auto_now_add=True)

class AnswerComment(models.Model):
	comment = models.ForeignKey('Comment')
	answer = models.ForeignKey('Answer')

class QuestionComment(models.Model):
	comment = models.ForeignKey('Comment')
	answer = models.ForeignKey('Question')