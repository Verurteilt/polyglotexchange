from .models import MessageChat
from mongoengine import Q

def get_last_50_messages_users(from_id, to_id, order_by='created_at', **kwargs):
	return MessageChat.objects.filter((Q(from_user=from_id) & Q(to_user=to_id)) | (Q(to_user=from_id) & Q(from_user=to_id)),**kwargs).order_by(order_by)

def get_last_50_messages_group(to_group, order_by='created_at', **kwargs):
	return MessageChat.objects.filter(to_group=to_group, **kwargs).order_by(order_by)
