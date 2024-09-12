from django.shortcuts import render

from projects.models import Project

def projectlist(request): 
    
    projects = Project.objects.all()
    
    context= {
        'title': 'Список проектов',
        'projects' : projects,
    }


    return render(request, 'projects/projectlist.html', context)


def project(request):
    return render(request, 'projects/project.html')