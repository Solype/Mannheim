#!/bin/python

from requests import get, post, put

base_url = "http://localhost:8080"


headers = {'Content-Type': 'application/json'}
token = post(f"{base_url}/login", headers=headers, json={"username":"a", "password":"a"})
headers["Authorization"] = f"Bearer {token.json()}"

print(token.json())

result = get(f"{base_url}/api/session/1/notes", headers=headers)
print(result.json())

result = post(f"{base_url}/api/session/1/notes", headers=headers, json={"content": "Hello world"})
print(result.json())

headers['Content-Type'] = 'application/json'
result = get(f"{base_url}/api/session/1/notes", headers=headers)
print(result.json())
