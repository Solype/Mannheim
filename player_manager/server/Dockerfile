FROM fedora:latest

# Installer wget et make
RUN dnf update -y

RUN dnf install -y python pip

COPY . /app

RUN pip install flask
RUN pip install flask_cors

WORKDIR /app

CMD [ "python", "server.py" ]
