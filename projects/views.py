from django.shortcuts import render

def projectlist(request):
    return render(request, 'projects/projectlist.html')


def project(request):
    return render(request, 'projects/project.html')