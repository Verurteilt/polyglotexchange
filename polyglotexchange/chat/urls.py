from django.conf.urls import patterns, include, url

urlpatterns = patterns('chat.views',
    url(r'^exists/$', 'home', name='exists_user'),
    url(r'^exists2/$', 'home2', name='exists_user'),
    url(r'^exists3/$', 'home3', name='exists_user'),
    #url(r'^twilio1/$', 'twilio1', name='twilio1'),
    #url(r'^twilio2/$', 'twilio2', name='twilio2'),
    url(r'^unload/$', 'unload', name='unload'),
    url(r'^load/$', 'load', name='load'),
    url(r'^users_connected/$', 'users_connected', name='users_connected'),
    url(r'^groups_available/$', 'groups_available', name='groups_available'),
    url(r'^insert_message_notify_nodejs/$', 'insert_message_notify_nodejs', name='insert_message_notify_nodejs'),
    url(r'^get_last_messages/$', 'get_last_messages', name='get_last_messages'),
    url(r'^get_last_messages_group/$', 'get_last_messages_group', name='get_last_messages_group'),

)
