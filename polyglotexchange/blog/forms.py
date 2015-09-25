from django import forms
from pagedown.widgets import PagedownWidget



class PostForm(forms.Form):
	name = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Name of the Post'}))
	body = forms.CharField(required=True, widget=PagedownWidget())
	tags = forms.CharField(required=True)

