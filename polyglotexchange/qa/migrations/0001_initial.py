# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('body', models.TextField(max_length=250)),
                ('accepted', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('last_edited', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='AnswerComment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('comentario', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Fav',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('question', models.CharField(max_length=250)),
                ('body', models.TextField()),
                ('upvotes', models.IntegerField()),
                ('downvotes', models.IntegerField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('last_edited', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionComment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('answer', models.ForeignKey(to='qa.Question')),
                ('comment', models.ForeignKey(to='qa.Comment')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionTag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('question', models.ForeignKey(to='qa.Question')),
                ('tag', models.ForeignKey(to='tags.Tag')),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='comments',
            field=models.ManyToManyField(to='qa.Comment', through='qa.QuestionComment'),
        ),
    ]
