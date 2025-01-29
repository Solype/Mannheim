#!/bin/python

from requests import get, post, put

base_url = "http://localhost:8080"


headers = {'Content-Type': 'application/json'}
token = post(f"{base_url}/login", headers=headers, json={"username":"a", "password":"a"})
headers["Authorization"] = f"Bearer {token.json()}"

headers2 = {'Content-Type': 'application/json'}
token = post(f"{base_url}/login", headers=headers2, json={"username":"b", "password":"b"})
headers2["Authorization"] = f"Bearer {token.json()}"



# sessions = get(f"{base_url}/api/my/requests/sessions", headers=headers)
# print(sessions.json())

# result = post(f"{base_url}/api/my/session/1/pawn", headers=headers, json={
#   "linked_id": 2,
#   "hidden": "totally",
#   "side": 0
# })
# result = get(f"{base_url}/api/session/1", headers=headers)
# print(result.json())

result = get(f"{base_url}/api/my/sessions", headers=headers)
print("U1 sessions:", result.json())

result = get(f"{base_url}/api/my/sessions", headers=headers2)
print("U2 sessions:",result.json())


result = get(f"{base_url}/api/my/requests/sessions", headers=headers)
print("U1 req sessions:", result.json())

result = get(f"{base_url}/api/my/requests/sessions", headers=headers2)
print("U2 req sessions:", result.json())


result = post(f"{base_url}/api/my/requests/sessions", headers=headers, json={
    "session_id": 1, 
    "receiver_id": 2
})
print(result.json())


result = get(f"{base_url}/api/my/requests/sessions", headers=headers)
print("U1 req sessions:", result.json())

result = get(f"{base_url}/api/my/requests/sessions", headers=headers2)
lst_request : list = result.json()
print("U2 req sessions:", lst_request)
if (len(lst_request)) :
    result = post(f"{base_url}/api/my/requests/sessions/{lst_request[0]["request_id"]}/accept", headers=headers2)
    print(result.json())


