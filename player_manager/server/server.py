#!/bin/python3
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return "Hello, World!"

@app.route('/greet')
def greet():
    name = request.args.get('name', 'World')
    return f"Hello, {name}!"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
