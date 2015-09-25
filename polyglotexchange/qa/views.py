#encoding: utf-8
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from qa.models import Question
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Create your views here.

@login_required
def single_page_question(request, id_question):
	return render(request, 'qa/singlequestion.html', locals())

@login_required
def questions(request, page=1):
	order_by = request.GET.get('ob', 'normal')
	if order_by == 'recent':
		_questions = Question.objects.get_recent_questions()
	elif order_by == 'popular':
		_questions = Question.objects.get_popular_questions()
	elif order_by == 'unanswered':
		_questions = Question.objects.get_unanswered_questions()
	else:
		order_by = 'normal'
		questions = Question.objects.get_normal_page_questions()

	if order_by != 'normal':
		paginator = Paginator(_questions, 9)
		try:
			questions = paginator.page(page)
		except PageNotAnInteger:
			questions = paginator.page(1)
		except EmptyPage:
			questions = paginator.page(paginator.num_pages)
	return render(request, 'qa/questions.html', locals())

