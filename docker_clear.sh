#!/bin/bash

# Arrêter tous les conteneurs Docker
docker stop $(docker ps -aq)

# Supprimer tous les conteneurs Docker
docker rm $(docker ps -aq)

# Supprimer toutes les images Docker
docker rmi $(docker images -aq)

# Supprimer tous les volumes Docker
docker volume rm $(docker volume ls -q)

# Supprimer tous les réseaux Docker non utilisés
docker network prune -f

# Optionnel : Supprimer les images non utilisées (dangling images)
docker image prune -f

echo "Tout a été supprimé avec succès !"
