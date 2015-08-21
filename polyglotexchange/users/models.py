from django.db import models
from django.contrib.auth.models import AbstractBaseUser, _user_has_perm, PermissionsMixin, _user_has_module_perms
from django.utils.encoding import force_unicode as _
import random, md5
from utils import generate_activation_code
from django.contrib.auth.signals import user_logged_in, user_logged_out

######################################

from .managers import UserManager

class LanguageUser(models.Model):
    language  = models.ForeignKey('languages.Language')
    user = models.ForeignKey('users.User')

class Country(models.Model):
    country = models.CharField(max_length=100)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True, db_index=True)
    birth = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    age = models.IntegerField()
    country = models.ForeignKey(Country, null=True, blank=True)
    activation_code = models.CharField(max_length=150)
    date_joined = models.DateTimeField(auto_now_add=True)
    mother_tongue = models.ForeignKey('languages.Language')
    languages_learning = models.ManyToManyField('languages.Language', through='LanguageUser')


    def save(self, *args, **kwargs):
        if not self.pk:
            self.activation_code = generate_activation_code(self)
        super(User, self).save(*args, **kwargs)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']

    def get_full_name(self):
        return _(self.first_name) + ' ' + _(self.last_name)

    def get_short_name(self):
        return _(self.first_name)

    def __unicode__(self):
        return _(self.username)

    def has_perm(self, perm, obj=None):
        if self.is_active and self.is_superuser:
            return True
        return _user_has_perm(self, perm, obj=obj)

    def has_module_perms(self, app_label):
        if self.is_active and self.is_superuser:
            return True
        return _user_has_module_perms(self, app_label)


    @property
    def is_staff(self):
        return self.is_admin

	@property
	def is_active(self):
		return self.is_active

class LoggedUser(models.Model):
    user = models.ForeignKey(User, primary_key=True)

    def __unicode__(self):
        return self.user.first_name +  " " + self.user.last_name

def login_user(sender, request, user, **kwargs):
        LoggedUser(user=user).save()

def logout_user(sender, request, user, **kwargs):
    try:
        u = LoggedUser.objects.get(user=user)
        u.delete()
    except LoggedUser.DoesNotExist:
        pass

user_logged_in.connect(login_user)
user_logged_out.connect(logout_user)
