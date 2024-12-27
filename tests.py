#!/bin/python

from requests import get, post, put

headers = {
    'Content-Type': 'application/json'
}

base_url = "http://localhost:8080"

token = post(f"{base_url}/login", headers=headers, json={"username":"a", "password":"a"})

print(token.json())
headers["Authorization"] = f"Bearer {token.json()}"

sessions = get(f"{base_url}/api/my/requests/sessions", headers=headers)
print(sessions.json())


