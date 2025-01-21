#!/bin/python

from requests import get, post, put

headers = {
    'Content-Type': 'application/json'
}

base_url = "http://localhost:8080"

token = post(f"{base_url}/login", headers=headers, json={"username":"a", "password":"a"})

print(token.json())
headers["Authorization"] = f"Bearer {token.json()}"

# sessions = get(f"{base_url}/api/my/requests/sessions", headers=headers)
# print(sessions.json())

# result = post(f"{base_url}/api/my/session/1/pawn", headers=headers, json={
#   "linked_id": 2,
#   "hidden": "totally",
#   "side": 0
# })

result = get(f"{base_url}/api/my/sessions", headers=headers)
print(result.json())

result = get(f"{base_url}/api/session/1", headers=headers)
print(result.json())
