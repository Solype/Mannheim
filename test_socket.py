import asyncio
import websockets

async def test_websocket():
    uri = "ws://127.0.0.1:8000/ws"
    
    # Connexion au WebSocket
    async with websockets.connect(uri) as websocket:
        # Envoyer un message
        message = "Bonjour, serveur WebSocket!"
        await websocket.send(message)
        print(f"Message envoyé : {message}")
        
        # Recevoir la réponse
        response = await websocket.recv()
        print(f"Réponse reçue : {response}")

# Exécution du client
asyncio.run(test_websocket())
