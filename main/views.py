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

def map(request):
    context={
        'title': 'Карта проектов',


    }
    return render(request, 'main/map.html', context)


def profile(request):
    context={
        'title': 'Профиль',
        'content': 'Информация о студенте',

    }
    return render(request, 'main/profile.html', context)


def tribes(request):
    context={
        'title': 'Трайбы',
        'content': 'Информация о трайбах',

    }
    return render(request, 'main/tribes.html', context)


def about(request):
    return HttpResponse('about page')
