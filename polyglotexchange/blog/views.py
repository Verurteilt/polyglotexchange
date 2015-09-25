from django.shortcuts import render, get_object_or_404
from blog.models import Post
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from django.db.models import F


# Create your views here.
@login_required
def blog(request, page=1):
	_posts = Post.objects.filter(enabled=True)
	paginator = Paginator(_posts, 9)
	try:
		posts = paginator.page(page)
	except PageNotAnInteger:
		posts = paginator.page(1)
	except EmptyPage:
		posts = paginator.page(paginator.num_pages)
	return render(request, 'blog/blog.html', locals())

@login_required
def single_post(request,slug):
	post = get_object_or_404(Post,slug=slug)
	post.views = F('views') + 1
	post.save()
	return render(request, 'blog/single_post.html', locals())
