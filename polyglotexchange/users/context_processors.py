from users.models import LoggedUser

def users_logged_in(request):
	return {"logged_users": map(lambda l: l.user, LoggedUser.objects.select_related('user').exclude(user__id=request.user.id))}

def logged_user_id(request):
	return {"logged_user_id": request.user.pk}