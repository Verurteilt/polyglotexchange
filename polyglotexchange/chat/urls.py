from django.conf.urls import patterns, include, url

urlpatterns = patterns('chat.views',
    url(r'^exists/$', 'home', name='exists_user'),
    url(r'^exists2/$', 'home2', name='exists_user'),
    url(r'^exists3/$', 'home3', name='exists_user'),
    url(r'^users_connected/$', 'users_connected', name='users_connected'),

)
