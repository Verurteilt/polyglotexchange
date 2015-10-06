from users.models import User

class UsernameBackend(object):

	def authenticate(self, username, password):
		try:
			if("@" in username):
				user  = User.objects.get(email=username)
			else:
				user  = User.objects.get(username=username)
			
			if user.check_password(password):
				return user
		except:
			return None
		return None

	def get_user(self, user_id):
		try:
			return User.objects.get(pk=user_id)
		except Exception as e:
			return None
