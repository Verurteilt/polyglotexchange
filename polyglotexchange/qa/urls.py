from django.conf.urls import patterns, include, url

urlpatterns = patterns('qa.views',
    url(r'^question/(?P<id_question>\d+)/$', 'single_page_question', name='qa-single-question'),
  	url(r'^questions/(?P<page>\d+)/$', 'questions', name='qa-questions'),
  	url(r'^questions/$', 'questions', name='qa-questions'),
)
