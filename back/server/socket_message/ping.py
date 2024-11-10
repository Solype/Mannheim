from server.server import sio

@sio.on('message')
async def message(sid, data):
    print("<< message", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    # Trouver la room du client (sid)
    rooms = sio.rooms(sid)
    for room in rooms:
        if room != sid:  # Éviter d'envoyer le pong à l'utilisateur lui-même, car il est déjà dans cette room
            await sio.emit('message', data=f"<from {sid}> {data}", to=room)
            print("-- room:", room, flush=True)


@sio.on("join")
async def join(sid, data):
    print("<< join", flush=True)
    print("-- sid:", sid, flush=True)
    print("-- data:", data, flush=True)
    for room in sio.rooms(sid):
        if room != sid:
            sio.leave_room(sid, room)
    message(sid, "Connected to room: " + data)
    sio.enter_room(sid, data)
