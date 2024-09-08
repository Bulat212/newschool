from django.contrib import admin

# Register your models here.

from projects.models import Project, СompleteProject

# admin.site.register(Project)
admin.site.register(СompleteProject)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    prepopulated_fields= {'slug':('name',)}


# @admin.register(СompleteProject)
# class СompleteProjectAdmin(admin.ModelAdmin):
#     # name = Project.objects.get(pk = project.name)
    # prepopulated_fields= {'slug':('name',)}