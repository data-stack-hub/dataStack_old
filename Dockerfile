

FROM node:12.7-alpine AS build
COPY . .
RUN ls
WORKDIR /public/datastack
RUN npm install
RUN npm run build --prod

FROM python:3.8
WORKDIR /python-docker

COPY datastack/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN ls

CMD [ "python", "datastack/api/app.py"]
