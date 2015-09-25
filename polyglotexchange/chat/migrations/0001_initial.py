# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatGroup',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('from_language', models.ForeignKey(related_name='from_language', to='languages.Language')),
                ('to_language', models.ForeignKey(related_name='to_language', to='languages.Language', null=True)),
            ],
        ),
    ]
