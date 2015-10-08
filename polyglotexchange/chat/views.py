##### DJANGO's LIBRARIES ######
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.db import transaction


##### PYTHON LIBRARIES FROM THIRDS ####
from twilio.rest import TwilioRestClient
import redis,json,re
from datetime import datetime

####### PROJECT's LIBRARIES ########
from users.models import LoggedUser, User
from chat.models import ChatGroup
from mongo_related.models import MessageChat
from mongo_related import get_last_50_messages_users, get_last_50_messages_group

@login_required
def unload(request):
    try:
        usuario = request.user
        LoggedUser.objects.get(user__id=usuario.id).delete()
    except:pass
    return HttpResponse("")

@login_required
def load(request):
    try:
        usuario = request.user
        LoggedUser.objects.create(user=usuario)
    except Exception as e:
        print e
        pass
    return HttpResponse("")

"""@login_required
def get_last_messages(request):
    from_id = request.GET.get('from')
    to = request.GET.get('to')
    usuario_from = User.objects.get(pk=from_id)
    usuario_to = User.objects.get(pk=to)
    messages = get_last_50_messages_users(from_id, to)
    info = []
    for m in messages:
        username = usuario_to.username
        if m.from_user == str(from_id):
            username = usuario_from.username
        info.append({"from_id": m.from_user, "to_id": m.to_user, "message": m.message, "username":username})
    return JsonResponse(info, safe=False)"""

@login_required
def get_last_messages(request):
    from_username = request.GET.get('from')
    to = request.GET.get('to')
    messages = get_last_50_messages_users(from_username, to)
    info = []
    for m in messages:
        info.append({"from": m.from_user, "to": m.to_user, "message": m.message})
    return JsonResponse(info, safe=False)

"""@login_required
def get_last_messages_group(request):
    group_id = request.GET.get('group_id')
    #to = request.GET.get('to')
    #usuario_from = User.objects.get(pk=from_id)
    #usuario_to = User.objects.get(pk=to)
    messages = get_last_50_messages_group(group_id)
    info = []
    for m in messages:
        username = User.objects.get(pk=m.from_user).username
        info.append({"from_id": m.from_user, "to_id": m.to_group, "message": m.message, "username":username})
    return JsonResponse(info, safe=False)"""

@login_required
def get_last_messages_group(request):
    group = request.GET.get('group')
    messages = get_last_50_messages_group(group)
    info = []
    for m in messages:
        info.append({"from": m.from_user, "to": m.to_group, "message": m.message})
    return JsonResponse(info, safe=False)


def insert_message_notify_nodejs(request):
    r = redis.StrictRedis(host='localhost', port=6379, db=0)
    to_user_id = request.GET['to_id']
    from_user_id = request.GET['from_id']
    message = request.GET['message']
    message_redis = {'message': message, 'user_id': from_user_id, 'to': to_user_id, 'chat_id': to_user_id}
    if not str(to_user_id).isalpha():
        r.publish('chat',json.dumps(message_redis))
        try:
            transaction.set_autocommit(True)
            m = MessageChat.objects.create(message=message, from_user=from_user_id, to_user=to_user_id, created_at=datetime.now())
        except:pass
    else:
        message_redis['username']  = User.objects.get(pk=from_user_id).username
        r.publish('chat_groups',json.dumps(message_redis))
        try:
            transaction.set_autocommit(True)
            m = MessageChat.objects.create(message=message, from_user=from_user_id, to_group=to_user_id, created_at=datetime.now())
        except Exception as e:
            print e #:pass
    return HttpResponse("Everything worked :)")





# Create your views here.
def node_api(request):
    try:
        r = redis.StrictRedis(host='localhost', port=6379, db=0)
        r.publish('chat',"HOAL")
        
        return HttpResponse("Everything worked :)")
    except Exception, e:
        return HttpResponseServerError(str(e))


@login_required
def users_connected(request):
    usuarios =  LoggedUser.objects.all().exclude(user=request.user)
    info = []
    for u in usuarios:
        info.append({"username": u.user.first_name, "user_id": u.user.pk, "languages": u.user.get_languages_learning_mother_tongue(),
                     "gender": u.user.get_gender()})
    return HttpResponse(json.dumps(info), content_type="application/json")

@login_required
def groups_available(request):
    grupos =  ChatGroup.objects.filter(available=True)
    info = []
    for g in grupos:
        info.append({"group_id": g.pk, "language_to": g.to_language.language, "language_from": g.from_language.language,
                     "group": g.group(), "language_to_img": g.to_language.flag.url, "language_from_img": g.from_language.flag.url})
    return HttpResponse(json.dumps(info), content_type="application/json")




def home(request):
	return render(request, 'chat/home.html', {})

def login(request):
	return render(request, 'chat/login.html', {})


def home2(request):
	return render(request, 'chat/home2.html', {})


def home3(request):
	return render(request, 'chat/home3.html', {})


def twilio1(request):
    token = "2083142ef881056862868fe1be75e126"
    sid= "AC507aca07d8d4bef701c42c11388de1d3"
    client_name="victor"
    return render(request, 'chat/twilio1.html', locals())


def twilio2(request):
    token = "2083142ef881056862868fe1be75e126"
    sid= "AC507aca07d8d4bef701c42c11388de1d3"
    client_name="sebastian"
    return render(request, 'chat/twilio2.html', locals())






from chat import pusher_server

def insert_message_notify_pusher(request):
    #r = redis.StrictRedis(host='localhost', port=6379, db=0)
    to_user = request.GET['to']
    from_user = request.GET['from']
    message = request.GET['message']
    pusher_server.trigger('messages', 'new_message', {
        'message': text,
        'to': to_user,
        'from': from_user
    })  
    #message_redis = {'message': message, 'user_id': from_user_id, 'to': to_user_id, 'chat_id': to_user_id}
    """if not str(to_user_id).isalpha():
        r.publish('chat',json.dumps(message_redis))
        try:
            transaction.set_autocommit(True)
            m = MessageChat.objects.create(message=message, from_user=from_user_id, to_user=to_user_id, created_at=datetime.now())
        except:pass
    else:
        message_redis['username']  = User.objects.get(pk=from_user_id).username
        r.publish('chat_groups',json.dumps(message_redis))
        try:
            transaction.set_autocommit(True)
            m = MessageChat.objects.create(message=message, from_user=from_user_id, to_group=to_user_id, created_at=datetime.now())
        except Exception as e:
            print e #:pass"""
    return HttpResponse("Everything worked :)")
