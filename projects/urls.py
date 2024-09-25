from django.urls import path
from projects import views

app_name = 'projects'

urlpatterns = [
    path('', views.projectlist, name='index'),
    path('project/<slug:project_slug>/', views.project, name='project'),
    path('code_editor/', views.code_editor, name='code_editor'),
    path('code_editor/runcode/', views.runcode, name='runcode'),
]
