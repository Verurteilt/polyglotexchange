from django.shortcuts import render
from django.http import HttpResponse

import redis
import json

from users.models import LoggedUser


# Create your views here.
def node_api(request):
    try:
        r = redis.StrictRedis(host='localhost', port=6379, db=0)
        r.publish('chat',"HOAL")
        
        return HttpResponse("Everything worked :)")
    except Exception, e:
        return HttpResponseServerError(str(e))



def users_connected(request):
    usuarios =  LoggedUser.objects.all()
    info = []
    for u in usuarios:
        info.append({"username": u.user.first_name, "user_id": u.user.pk})
    return HttpResponse(json.dumps(info), content_type="application/json")





def home(request):
	return render(request, 'chat/home.html', {})

def login(request):
	return render(request, 'chat/login.html', {})


def home2(request):
	return render(request, 'chat/home2.html', {})


def home3(request):
	return render(request, 'chat/home3.html', {})