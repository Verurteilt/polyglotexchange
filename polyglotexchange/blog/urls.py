from django.conf.urls import patterns, include, url

urlpatterns = patterns('blog.views',
    url(r'^post/(?P<slug>[\w-]+)/$', 'single_post', name='blog-single-post'),
  	url(r'^(?P<page>\d+)/$', 'blog', name='blog-blog'),
  	url(r'^$', 'blog', name='blog-blog'),
)
