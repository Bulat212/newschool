from django.shortcuts import render
import sys, subprocess
from projects.models import Project

languages = {
        "C++": "cpp",
        "JavaScript": "js",
        "Python": "py",
}

def projectlist(request): 
    projects = Project.objects.all()
    context= {
        'title': 'Список проектов',
        'projects' : projects,
    }
    return render(request, 'projects/projectlist.html', context)


def project(request):
    return render(request, 'projects/project.html')

def code_editor(request):
    return render(request, 'projects/code_editor.html', {'languages': languages})

def runcode(request):
    # codeareadata = ''
    output = ''
    if request.method == "POST":
        lang = request.POST['language']
        codeareadata = request.POST['codearea']
        with open('temp.' + lang, 'w') as f:
            f.write(codeareadata)
            f.close()

            try:
                if lang == languages["C++"]:
                    subprocess.check_output(["g++", "temp.cpp", "-o", "temp"], stderr=subprocess.STDOUT)
                    output = subprocess.check_output(["./temp"]).decode()
                elif lang == languages['Python']:
                    output = subprocess.check_output(["python3", "temp.py"], stderr=subprocess.STDOUT).decode()
                elif lang == languages['JavaScript']:
                    output = subprocess.check_output(["node", "temp.js"], stderr=subprocess.STDOUT).decode()

            except subprocess.CalledProcessError as e:
                output = e.output.decode()
                if lang == languages['JavaScript']:
                    output = '\n'.join(output.split('\n')[1:])

    return render(request, 'projects/code_editor.html', {'code': codeareadata,
                                                         'output': output,
                                                         'languages': languages,
                                                         'select_lang': lang})