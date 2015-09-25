from django import forms
from pagedown.widgets import PagedownWidget


class QuestionForm(forms.Form):
	question = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'What would you like to know?'}))
	body = forms.CharField(required=True, widget=PagedownWidget())
	tags = forms.CharField(required=True)


class AnswerForm(forms.Form):
	body = forms.CharField(required=True, widget=PagedownWidget())

class CommentForm(forms.Form):
	body = forms.CharField(required=True, max_length=100)