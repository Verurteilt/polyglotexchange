# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tags', '0001_initial'),
        ('qa', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='owner',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='question',
            name='tags',
            field=models.ManyToManyField(to='tags.Tag', through='qa.QuestionTag'),
        ),
        migrations.AddField(
            model_name='fav',
            name='question',
            field=models.ForeignKey(to='qa.Question'),
        ),
        migrations.AddField(
            model_name='fav',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='comment',
            name='owner',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='answercomment',
            name='answer',
            field=models.ForeignKey(to='qa.Answer'),
        ),
        migrations.AddField(
            model_name='answercomment',
            name='comment',
            field=models.ForeignKey(to='qa.Comment'),
        ),
        migrations.AddField(
            model_name='answer',
            name='comments',
            field=models.ManyToManyField(to='qa.Comment', through='qa.AnswerComment'),
        ),
        migrations.AddField(
            model_name='answer',
            name='owner',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(to='qa.Question'),
        ),
    ]
