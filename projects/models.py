from tabnanny import verbose
from django.db import models

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=200, unique=True, verbose_name='Название')
    slug = models.SlugField(max_length=200, unique=True, null=True, blank=True, verbose_name='Слаг')
    description = models.TextField(null=True, blank=True, verbose_name='Описание')
    link_to_git = models.URLField(max_length=200, unique=True, blank=True, null=True, verbose_name='Ссылка на гит')
    hours_to_complete = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Часы на выполнение')
    necessary_level = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Необходимый уровень')
    experience = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Опыт за проект')

    class Meta:
        # db_table = 'project'
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'