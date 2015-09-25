# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_chatgroup_available'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatgroup',
            name='id',
        ),
        migrations.AddField(
            model_name='chatgroup',
            name='group_id',
            field=models.CharField(default='sp-sp', max_length=20, serialize=False, primary_key=True),
            preserve_default=False,
        ),
    ]
