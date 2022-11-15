from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length = 100, blank = False)
    description = models.TextField(blank=True)
    time = models.DateTimeField(auto_now=False, auto_now_add=False)
    
    def __str__(self):
        return self.title
    
    def get_initials(self):
        sp = ''
        split = self.title.split()[:2]
        for i in split:
            sp += i[0].upper()
        return sp
        