FROM python:3.8

WORKDIR /python-docker

COPY datastack/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .
WORKDIR /public/datastack
RUN ls
RUN npm install
CMD [ "python", "datastack/api/app.py"]
