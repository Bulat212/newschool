
from django.urls import path
from main import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path('map/', views.map, name='map'),
    path('tribes/', views.tribes, name='tribes'),

]
