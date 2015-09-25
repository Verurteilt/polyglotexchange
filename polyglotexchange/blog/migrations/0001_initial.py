# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=100)),
                ('slug', models.SlugField(max_length=100, null=True, blank=True)),
                ('body', models.TextField()),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('visits', models.BigIntegerField(default=0, null=True)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='TagPost',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('post', models.ForeignKey(to='blog.Post')),
                ('tag', models.ForeignKey(to='tags.Tag')),
            ],
        ),
    ]
