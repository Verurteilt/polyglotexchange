# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
        ('languages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(null=True, verbose_name='last login', blank=True)),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(unique=True, max_length=100)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.EmailField(unique=True, max_length=255, verbose_name=b'email address', db_index=True)),
                ('birth', models.DateField(null=True, blank=True)),
                ('is_active', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('age', models.IntegerField(default=0)),
                ('activation_code', models.CharField(max_length=150)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('about_me', models.TextField()),
                ('language_partner_requirements', models.TextField()),
                ('language_goals', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('country', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='LanguageProficiency',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('key', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='LanguageUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('language', models.ForeignKey(to='languages.Language')),
                ('language_proficiency', models.ForeignKey(to='users.LanguageProficiency')),
            ],
        ),
        migrations.CreateModel(
            name='LoggedUser',
            fields=[
                ('user', models.ForeignKey(primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='languageuser',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='country',
            field=models.ForeignKey(blank=True, to='users.Country', null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(related_query_name='user', related_name='user_set', to='auth.Group', blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='languages_learning',
            field=models.ManyToManyField(to='languages.Language', through='users.LanguageUser'),
        ),
        migrations.AddField(
            model_name='user',
            name='mother_tongue',
            field=models.ForeignKey(related_name='mother_tongue', to='languages.Language', null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(related_query_name='user', related_name='user_set', to='auth.Permission', blank=True, help_text='Specific permissions for this user.', verbose_name='user permissions'),
        ),
    ]
