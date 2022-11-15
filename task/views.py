from django.shortcuts import render
from .models import Task
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def tasks(request):
    tasks = Task.objects.all()
    context = {'tasks':tasks}
    return render(request, 'index.html', context)

@csrf_exempt  
def add_task(request):
    if request.method == "POST":
        task = Task()
        task.title = request.POST.get('title')
        task.description = request.POST.get('description')
        task.time = request.POST.get('time')
        try:
            task.save()
        except Exception:
            return JsonResponse(dict(Exception))
        
    return JsonResponse({'message':'success'})
            
    

def delete_task(request, pk):
    task = Task.objects.get(pk = pk)
    task.delete()
    
    tasks = Task.objects.all()
    context = {'tasks':tasks}
    return render(request, 'index.html', context)

@csrf_exempt
def task_details(request, pk):
    if request.method == "POST":
        t = Task.objects.get(pk=pk)
        data = {}
        if t:
            data = model_to_dict(t)
        return JsonResponse(data)
    
@csrf_exempt  
def task_edit(request, pk):
    if request.method == "GET":
        print('get request sent')
    if request.method == "POST":
        task = Task.objects.get(pk=pk)
        task.title = request.POST.get('title')
        task.description = request.POST.get('description')
        task.time = request.POST.get('time')
        try:
            task.save()
        except Exception:
            return JsonResponse(dict(Exception))
        
    return JsonResponse({'message':'success'})