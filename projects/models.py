# from tabnanny import verbose
from django.db import models
from django.utils.text import slugify

# Create your models here.

class Project(models.Model): 
    slug = models.SlugField(max_length=200, unique=True, null=True, blank=True, verbose_name='Слаг')
    name = models.CharField(max_length=200, unique=True, verbose_name='Название')
    description = models.TextField(null=True, blank=True, verbose_name='Описание')
    hoursToComplete = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Часы на выполнение')
    necessaryLevel = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Необходимый уровень')
    taskExperience = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Опыт за проект')

    class Meta:
        # db_table = 'project'
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'

    def __str__(self):
        return self.name


class СompleteProject(models.Model):
    student = models.IntegerField(verbose_name="Студент")
    project = models.ForeignKey(to=Project, on_delete=models.CASCADE, verbose_name="Проект") #если удалим проект, то удалятся и все завершенные проекты
    leadTime = models.DurationField(blank=True, null=True, verbose_name="Время выполнения")
    gainedExperience = models.IntegerField(verbose_name="Полученный опыт")
    is_completed = models.BooleanField(default=False, verbose_name="Статус выполнения")


    class Meta:
        verbose_name = 'Завершенный проект'
        verbose_name_plural = 'Завершенные проекты'

    def __str__(self):
        return "_".join([self.project.name, 'student', str(self.student)])
