from django.shortcuts import render
from django.contrib.auth import login, authenticate as _auth
from django.http import JsonResponse
from chat import pusher_server
from users.models import User
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def auth(request):
	if request.method == "POST":
		username = request.POST['username']
		password = request.POST['password']
		print username, password, request.POST
		user = _auth(username=username, password=password)
		if user:
			if user.is_active:
				print login(request, user)
				print(request.GET)
				return JsonResponse({'next': request.GET.get('next') or '/'})
		return JsonResponse({'error': "Please validate username and password"})
@csrf_exempt
def auth_pusher(request):
	current_user = request.user
	if isinstance(current_user, User):
		auth = pusher_server.authenticate(
			channel = request.POST['channel_name'],
			socket_id = request.POST['socket_id'],
			custom_data = {
				'user_id': current_user.pk,
				'user_info': {
					'username':  current_user.username,
					'gender': current_user.gender,
					'languages': current_user.get_languages_learning_mother_tongue(),				
				}
			}
		)
		return JsonResponse(auth)
	return JsonResponse({'error': 'ERROR'})

def login_view(request):
	return render(request, 'users/login.html')