

FROM node:12.7-alpine AS build
COPY . .

WORKDIR /public/datastack
RUN npm install
RUN ls

FROM python:3.8
WORKDIR /python-docker

COPY datastack/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt


CMD [ "python", "datastack/api/app.py"]
