from django.urls import path, include
from . import views

app_name = 'task'

urlpatterns = [
    path('', views.tasks, name='tasks'),
    path('tasks/<int:pk>/delete', views.delete_task, name='delete_task'),
    path('tasks/<int:pk>/details', views.task_details, name='task_details'),
    path('tasks/<int:pk>/edit', views.task_edit, name='edit_task'),
    path('tasks/add', views.add_task, name='add_task'),
]
