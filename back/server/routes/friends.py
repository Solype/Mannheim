from server.server import app, HTTPAuthorizationCredentials, security, Depends, HTTPException
from server.mysql_db import getone_db, modify_db, get_db
from server.access_manager import access_manager
from server.routes.server_datatype.friend_type import Friend, FriendRequest, FriendName

@app.get("/api/my/friends", tags=["Friends"])
async def get_friends(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[Friend]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    friend1 = get_db("SELECT friend_id2 FROM `friends` WHERE friend_id1 = %s", (user_id,))
    friend2 = get_db("SELECT friend_id1 FROM `friends` WHERE friend_id2 = %s", (user_id,))
    friends = friend1 + friend2
    final_friends = []

    for friend in friends:
        friend_id = friend[0]
        friend_name = getone_db("SELECT username FROM `users` WHERE id = %s", (friend_id,))
        if not friend_name:
            raise HTTPException(status_code=404, detail="Friend not found")
        friend_name = friend_name[0]
        final_friends.append(Friend(id=friend_id, name=friend_name))

    return final_friends


@app.post("/api/my/friends", tags=["Friends"])
async def request_friend(data: FriendName, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    friend_id = getone_db("SELECT id FROM `users` WHERE username = %s", (data.friend_name,))
    if not friend_id:
        raise HTTPException(status_code=404, detail="Friend not found")

    already_sent = getone_db("SELECT id FROM `friend_requests` WHERE sender_id = %s AND receiver_id = %s", (user_id, friend_id[0]))
    if already_sent:
        raise HTTPException(status_code=400, detail="Already sent")
    already_sent = getone_db("SELECT id FROM `friends` WHERE (friend_id1 = %s AND friend_id2 = %s) OR (friend_id1 = %s AND friend_id2 = %s)", (user_id, friend_id[0], friend_id[0], user_id))
    if already_sent:
        raise HTTPException(status_code=400, detail="Already friends")

    success = modify_db("INSERT INTO `friend_requests` (sender_id, receiver_id, status) VALUES (%s, %s, 'pending')", (user_id, friend_id[0]))
    if success == None:
        raise HTTPException(status_code=500, detail="Failed to send friend request")
    
    return




def compose_friend_request(friend_request_id: int) -> FriendRequest:
    users_ids_and_infos = getone_db("SELECT sender_id, receiver_id, id, status FROM `friend_requests` WHERE id = %s", (friend_request_id,))
    if not users_ids_and_infos:
        print("Friend request not found at", __name__, __file__, friend_request_id)
        raise HTTPException(status_code=404, detail="Friend request not found")

    sender_id = users_ids_and_infos[0]
    receiver_id = users_ids_and_infos[1]
    request_id = users_ids_and_infos[2]
    status = users_ids_and_infos[3]

    sender_name = getone_db("SELECT username FROM `users` WHERE id = %s", (sender_id,))
    if not sender_name:
        print("Sender not found at", __name__, __file__, sender_id)
        raise HTTPException(status_code=404, detail="Sender not found")
    sender_name = sender_name[0]

    receiver_name = getone_db("SELECT username FROM `users` WHERE id = %s", (receiver_id,))
    if not receiver_name:
        print("Receiver not found at", __name__, __file__, receiver_id)
        raise HTTPException(status_code=404, detail="Receiver not found")
    receiver_name = receiver_name[0]

    return FriendRequest(request_id=request_id, sender_id=sender_id, sender_name=sender_name, receiver_id=receiver_id, receiver_name=receiver_name, status=status)




@app.get("/api/my/requests/friends", tags=["Friends"])
async def get_friends_requests(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[FriendRequest]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    requests = get_db("SELECT id FROM `friend_requests` WHERE receiver_id = %s AND status = 'pending'", (user_id,))
    return [compose_friend_request(request_id[0]) for request_id in requests]





@app.get("/api/my/requests/friends/sent", tags=["Friends"])
async def get_sent_friends_requests(credentials: HTTPAuthorizationCredentials = Depends(security)) -> list[FriendRequest]:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    requests = get_db("SELECT id FROM `friend_requests` WHERE sender_id = %s AND status = 'pending'", (user_id,))
    return [compose_friend_request(request_id) for request_id in requests]





@app.post("/api/my/requests/friends/{request_id}/accept", tags=["Friends"])
async def accept_friend_request(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    sender_id = getone_db("SELECT sender_id FROM `friend_requests` WHERE id = %s AND status = 'pending'", (request_id,))
    if not sender_id:
        raise HTTPException(status_code=404, detail="Friend request not found")
    sender_id = sender_id[0]

    success = modify_db("INSERT INTO `friends` (friend_id1, friend_id2) VALUES (%s, %s)", (user_id, sender_id,))
    if success == None:
        raise HTTPException(status_code=500, detail="Failed to create link between user and friend")

    success = modify_db("UPDATE `friend_requests` SET status = 'accepted' WHERE id = %s", (request_id,))
    if success == None:
        raise HTTPException(status_code=500, detail="Failed to accept friend request")
    return

@app.post("/api/my/requests/friends/{request_id}/decline", tags=["Friends"])
async def decline_friend_request(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    success = modify_db("UPDATE `friend_requests` SET status = 'refused' WHERE id = %s AND status = 'pending'", (request_id,))
    if success == None:
        raise HTTPException(status_code=500, detail="Failed to decline friend request")
    return


@app.delete("/api/my/requests/friends/{request_id}", tags=["Friends"])
async def delete_friend_request(request_id: int, credentials: HTTPAuthorizationCredentials = Depends(security)) -> None:
    token = credentials.credentials
    if not token or not access_manager.isTokenValid(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_id = access_manager.getTokenData(token).id

    success = modify_db("DELETE FROM `friend_requests` WHERE id = %s AND sender_id = %s", (request_id, user_id))
    if success == None:
        raise HTTPException(status_code=404, detail="Friend request not found or not sent by user")
    return
