#from django.db import models
#from djangotoolbox.fields import ListField
from mongoengine import *
from django.conf import settings

connect(settings.DBMONGO)

"""class MessageChatManager(models.Manager):
	def get_last_50_messages_users(self, from_id, to_id, order_by='created_at', **kwargs):
		return self.model.objects.filter(from_user=from_id, to_user=to_id,**kwargs).order_by(order_by)
	
	def get_last_50_messages_group(self, to_group, order_by='created_at', **kwargs):
		return self.model.objects.filter(to_group=to_group, **kwargs).order_by(order_by)"""



#class MessageChat(models.Model):
#	message = models.TextField()
#	from_user = models.CharField(max_length=25)
#	to_group = models.CharField(max_length=25, null=True)
#	to_users = ListField()
#	to_user = models.CharField(max_length=25,null=True)
#	seen = models.BooleanField(default=False)
#	seen_at = models.DateTimeField(null=True)
#	created_at = models.DateTimeField(auto_now_add=True)

#	objects = MessageChatManager()


class MessageChat(Document):
	message = StringField()
	from_user = StringField(max_length=25)
	to_group = StringField(max_length=25, null=True)
	to_users = ListField()
	to_user = StringField(max_length=25,null=True)
	seen = BooleanField(default=False)
	seen_at = DateTimeField(null=True)
	created_at = DateTimeField()

	#messages = MessageChatManager()
