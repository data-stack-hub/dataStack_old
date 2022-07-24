FROM python:3.8

WORKDIR /python-docker

COPY datastack/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .
EXPOSE = $PORT
CMD [ "python", "datastack/api/app.py"]
