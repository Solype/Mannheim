from requests import post
import socketio

base_url = "http://localhost:8080"

# Créer une instance du client Socket.IO
sio = socketio.Client()

# Connexion au serveur Socket.IO
SOCKET_SERVER_URL = "ws://localhost:8080"  # Remplace par l'URL de ton serveur
sio.connect(SOCKET_SERVER_URL, socketio_path="/socket.io", transports=["websocket"])


# Pour gérer des événements, tu peux par exemple utiliser un décorateur
@sio.event
def connect():
    print("Connecté au serveur Socket.IO")

@sio.event
def disconnect():
    print("Déconnecté du serveur")


headers = {'Content-Type': 'application/json'}
token = post(f"{base_url}/login", headers=headers, json={"username":"a", "password":"a"})
headers["Authorization"] = f"Bearer {token.json()}"

@sio.on("new_pawn")
def on_new_pawn(data):
    print("Nouveau pawn:", data)

sio.emit("join_room", {"session_id": 2, "token": token.json()})

# Bloquer le programme pour qu'il continue à écouter les événements
sio.wait()
