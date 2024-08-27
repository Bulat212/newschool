from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    context={
        'title': 'Home',
        'content': 'главная страница сайта',
        'list':['first', 'second'],
        'dict':{'first':1},
        'bool':False
    }
    return render(request, 'main/index.html', context)

def about(request):
    return HttpResponse('about page')
