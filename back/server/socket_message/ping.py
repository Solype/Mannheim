from server.server import sio

@sio.on('ping')
async def ping(sid):
    print("PING", flush=True)
    print("-- sid:", sid, flush=True)
    await sio.emit('pong', to=sid)

@sio.on('gping')
async def gping(sid):
    print("GPING", flush=True)
    print("-- sid:", sid, flush=True)
    await sio.emit('pong')

@sio.on('rping')
async def rping(sid):
    """Répond à un ping avec un pong uniquement pour les utilisateurs dans la même room que le sid"""
    print("RPING", flush=True)
    print("-- sid:", sid, flush=True)
    
    # Trouver la room du client (sid)
    rooms = sio.rooms(sid)
    for room in rooms:
        if room != sid:  # Éviter d'envoyer le pong à l'utilisateur lui-même, car il est déjà dans cette room
            await sio.emit('pong', to=room)
            print(f"Sent 'pong' to room: {room}")

