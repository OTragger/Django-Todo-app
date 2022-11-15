from django.shortcuts import render
from task.models import Task

def mainpage(request):
    tasks = Task.objects.all()
    context = {'tasks':tasks}
    return render(request, 'index.html', context)