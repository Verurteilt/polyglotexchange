from django.contrib import admin
from blog.models import Post,TagPost
from pagedown.widgets import AdminPagedownWidget
from django.db import models


class PostModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': AdminPagedownWidget },
    }
# Register your models here.
admin.site.register(Post,PostModelAdmin)
admin.site.register(TagPost)

from django.db import models

