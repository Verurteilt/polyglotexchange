# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('languages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='language',
            name='flag',
            field=models.FileField(default='', upload_to=b'flags/'),
            preserve_default=False,
        ),
    ]
