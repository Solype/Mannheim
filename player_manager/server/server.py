from flask import Flask, request, jsonify
from flask_cors import CORS
from os import listdir
from os.path import isfile, join
import json


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return "Hello, World!"


def extract_players_from_file(file):
    f = open("./players/" + file)
    content = f.read()
    python_obj = None
    try:
        f = open("./players/" + file)
        str_data = f.read()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)

    except json.JSONDecodeError as e:
        print("Erreur de décodage JSON:", e)

    except Exception as e:
        print("Une erreur s'est produite:", e)

    return python_obj


@app.route('/players/health')
def players_health():
    onlyfiles = [f for f in listdir("./players") if isfile(join("./players", f)) if f.endswith(".json")]
    response = {
        "content": []
    }
    for file in onlyfiles:
        tmp = extract_players_from_file(file)
        if tmp != None:
            response["content"].append(tmp)
    return jsonify(response)

@app.route('/greet')
def greet():
    name = request.args.get('name', 'World')
    if name is None or name == "":
        name = "COUCOU PETIT CONNARD"
    message = f"Hello, {name}!"
    response = {
        "message": message,
        "name": name,
        "status": "success"
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
