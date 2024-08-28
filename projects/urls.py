from django.urls import path
from projects import views

app_name = 'projects'

urlpatterns = [
    path('', views.projectlist, name='index'),
    path('project/', views.project, name='project'),

]
