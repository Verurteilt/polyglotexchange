from django.db import models
from utils.slughifi import slughifi, unique_slug

# Create your models here.
class TagPost(models.Model):
	tag = models.ForeignKey('tags.Tag')
	post = models.ForeignKey('Post')


class Post(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, null=True, blank=True)
    body = models.TextField()
    tags = models.ManyToManyField('tags.Tag', through="TagPost")
    date_created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('users.User')
    visits = models.BigIntegerField(null=True, default=0)
    enabled = models.BooleanField(default=True)
    def __unicode__(self):
        return self.name
    
    def get_tags(self):
        return self.tags_set.values_list('tag__tag')
    
    def save(self, *args, **kwargs):
        self.slug = unique_slug(self, 'name', 'slug')
        self.slug = self.slug.lower()
        super(Post, self).save(*args, **kwargs)
    
  	#def get_absolute_url(self):
    #    return reverse('blog.views.post', args=[str(self.slug)])
    
    #def get_categorias(self):
        #return self.categorias.all()
    
    #def editar_post(self):
        #return reverse('blog.views.editar_post', args=[str(self.slug)])

    def data_disqus_url(self):
        return "http://www.polyglotexchange.com" + self.get_absolute_url()
        
    class Meta:
		ordering = ["-id"]
