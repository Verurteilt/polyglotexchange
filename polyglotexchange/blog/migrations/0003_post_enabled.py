# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20150906_0530'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='enabled',
            field=models.BooleanField(default=True),
        ),
    ]
