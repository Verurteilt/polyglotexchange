from django.db import models

class QuestionManager(models.Manager):
    
    def get_recent_questions(self):
        return self.model.objects.order_by('created')

    def get_popular_questions(self):
        return self.model.objects.order_by('-upvotes')

    def get_unanswered_questions(self):
        return self.model.objects.annotate(num_answers=models.Count('answer')).order_by('num_answers')

    def get_normal_page_questions(self):
        rq = self.get_recent_questions()[0:3]
        pq = self.get_popular_questions()[0:3]
        uq = self.get_unanswered_questions()[0:3]
        return {'rq':rq, 'pq':pq, 'uq':uq}

