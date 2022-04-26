from cgi import test
from genericpath import exists
import os
import pathlib
import sys
from collections import defaultdict
import json , requests, pprint , os
from venv import create
from random import random
import pathlib
from os import path
import sys
import json
import chdir
from os import path
import codecs
from requests.auth import HTTPBasicAuth
import requests

path5 = sys.argv
list = path5[1:]
myUrl = ''
for x in list:
    myUrl +=''+x
print('**********Getting Project****************')
cmd = 'git clone '+myUrl




print('Start Getting Project ...')
os.system(cmd)


print('getting project is done !!!')

file_name2=myUrl.rsplit("/",1)[1]
print(file_name2)
file_name = myUrl[31:]
# Getting into folder 
print(file_name)
cdFile = 'cd ' +file_name2


# Read text File
os.chdir(file_name2)
os.system('dir')
os.getcwd()

configuration_file  = open("sonar-project.properties", "w")
configuration_file.write('sonar.projectKey='+file_name2+'\n')
configuration_file.write('sonar.projectName='+file_name2+'\n')
configuration_file.write('sonar.sourceEncoding=UTF-8')

configuration_file.close()
#Login to Sonarqube via api

url = 'http://localhost:9111/api/authentication/login?login=admin&password=123456'
myToken = '7746353da4991fc617683aff5cfea50f0e89c2e8'

r=requests.post(url)
print(r)
#print(r.json())
print(file_name2)
# Gurrrently in folder 
#NbfilesRoutes = 0
#NnbfilesModels = 0
#NbFilesTot = 0
#HashMapModels = dict({})

create_project = 'http://localhost:9111/api/projects/create?project='+file_name2+'&name='+file_name2
creaPost =requests.post(create_project)
print(creaPost)


print('sonar-scanner.bat -D"sonar.projectKey='+file_name2+' -D"sonar.sources=." -D"sonar.host.url=http://localhost:9111" -D"sonar.login=7746353da4991fc617683aff5cfea50f0e89c2e8"')
#os.system('sonar-scanner -Dsonar.login=7746353da4991fc617683aff5cfea50f0e89c2e8')

print("Things are going well !!!")



"""
if(path.exists('server')):
    print('Folder Found !!!')
    os.chdir('server')
    os.system('dir')


    #Models Testss Documentations !
    #check directory
    ModelFileName = ''
    modelsFiles=['models','Model','Models','entity','Entities']
    for directory in modelsFiles:
        if(pathlib.Path(directory).exists()):
            ModelFileName=directory

    
    
    #Getting into Models File 
    print(ModelFileName)
    #Getting into Models Folder 
    os.chdir(ModelFileName)
    os.system('dir')
    directory= os.getcwd()
  #  print("current directory is here :"+directory)
    NnbfilesModels = len(os.listdir(directory))
    listofFilesModels = os.listdir(directory)
        #Count nbre of files in Models 
    print("we got "+str(NnbfilesModels)+" files in models directory")

    #Checking files documentation file by file

    print(listofFilesModels)
    testDocFiles=0
    for root, dirs, files in os.walk('.', topdown=True):
            dirs.clear() #with topdown true, this will prevent walk from going into subs
            for file in files:
                #do some stuff
               # print(file)

                student_file = open(file,"r")
                #Read File Line by Line 
                studenTEST=student_file.read().splitlines()
               # print(studenTEST)
                student_file.close()
                for i , line in enumerate(studenTEST):
                    if(line.startswith('//')):
                        testDocFiles +=1
                HashMapModels[file] = testDocFiles     

    print(HashMapModels)       


                        
    


"""
"""
    NnbfilesModels = len(os.listdir(ModelFileName))
    print(NnbfilesModels+'Files in Models Directory')
    print(NnbfilesModels)
"""



    





