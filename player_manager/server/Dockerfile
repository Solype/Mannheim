FROM fedora:latest

# Installer wget et make
RUN dnf update -y

RUN dnf install -y python pip

COPY . /app

RUN pip install flask

WORKDIR /app

CMD [ "python", "server.py" ]
