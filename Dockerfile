

FROM node:14.15-alpine AS build
COPY . .
RUN ls
WORKDIR /public/datastack
RUN npm install
RUN npm run build --prod

FROM python:3.8


RUN ls
WORKDIR /datastack
RUN pip3 install -r datastack/requirements.txt
RUN ls

CMD [ "python", "datastack/api/app.py"]
