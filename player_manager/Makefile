##
## EPITECH PROJECT, 2024
## area
## File description:
## Makefile
##

# Récupère l'adresse IP de l'hôte
HOST_IP := $(shell ip route get 1 | awk '{print $$7;exit}')

all: run

# Construire uniquement les conteneurs
build:
	VITE_BACKEND_URL=$(HOST_IP) docker-compose build

# Construire et démarrer les conteneurs
run: build
	VITE_BACKEND_URL=$(HOST_IP) docker-compose up --build

# Arrêter les conteneurs
stop:
	docker-compose stop

# Nettoyer les conteneurs et les volumes
clean: stop
	docker-compose down -v

# Nettoyer tout : images, volumes, orphelins
sclean: stop
	docker-compose down --rmi all --volumes --remove-orphans

.PHONY: all build run stop clean sclean

