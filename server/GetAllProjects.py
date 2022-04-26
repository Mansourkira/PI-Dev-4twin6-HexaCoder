from cgi import test
from genericpath import exists
import os
import pathlib
import sys
from collections import defaultdict
import json , requests, pprint , os
from random import random
import pathlib
from os import path
import sys

import chdir
from os import path
#get All Projects

url = 'http://localhost:9111/api/authentication/login'
myToken = '0f2bcd036e92a5c9c71a89e6b523febaea7577a6'

session = requests.Session()


#List of projects
getProjects = 'http://localhost:9111/api/components/search?qualifiers=TRK'
call = getattr(session, 'get')
res = call(getProjects)
print(res.status_code)


binary = res.content
output = json.loads(binary)
pprint.pprint(output)





#Specify a project and get TRUE OR False

getProjects = 'http://localhost:9111/api/project_branches/list?project=azeaze'
call = getattr(session, 'get')
res = call(getProjects)
print(res.status_code)

 

binary = res.content
output = json.loads(binary)
pprint.pprint(output)











#GET BUGS ,  AND ALL DETAILS for one project
getProjects = 'http://localhost:9111/api/measures/component?component=azeaze&metricKeys=violations'
x=requests.get(getProjects)
print(x.text)

