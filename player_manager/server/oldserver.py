from flask import Flask, request, jsonify
from flask_cors import CORS

# from os import listdir
# from os.path import isfile, join
# from utils import extract_players_from_file, filter_heath_players, modify_simple_data, modify_monitor, upgrade_monitor, remove_role, add_role, \
#     remove_language, add_language, add_god, remove_god, modify_devotion, modify_skill
from flask_socketio import SocketIO, emit
from flask_restx import Api, Resource

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


def start():
    socketio.run(app, host="0.0.0.0", port=5000)

# @app.route('/players/health')
# def players_health():
#     onlyfiles = [f for f in listdir("./players") if isfile(join("./players", f)) if f.endswith(".json")]
#     response = {
#         "content": [],
#         "status": "success"
#     }
#     for file in onlyfiles:
#         tmp = extract_players_from_file(file)
#         if tmp != None:
#             response["content"].append(tmp)
#     response["content"] = filter_heath_players(response["content"])
#     return jsonify(response)

# @app.route('/player/<string:name>/skill', methods=['POST'])
# def change_skill(name):
#     if "skill" not in request.json.keys() or "brut" not in request.json.keys() or "role" not in request.json.keys() :
#         print("Missing parameters")
#         return { "status": "error" }
#     if modify_skill(name, request.json["skill"], request.json["role"], request.json["brut"]):
#         return { "status": "success" }
#     print("Failed")
#     return { "status": "error" }

# @app.route('/player/<string:name>/monitor', methods=['POST'])
# def change_monitor(name):
#     if "monitor" not in request.json.keys() or "value" not in request.json.keys() or "type" not in request.json.keys() :
#         return { "status": "error", "content": "Missing parameters" }

#     if request.json["type"] == "upgrade":
#         if upgrade_monitor(name, request.json["monitor"], request.json["value"]):
#             health_data = players_health().get_json()  # Extract JSON data
#             socketio.emit('updateData', health_data)
#             return { "status": "success" }
#         return { "status": "error", "content": "failed to upgrade" }

#     if request.json["type"] == "update":
#         if modify_monitor(name, request.json["monitor"], request.json["value"]):
#             health_data = players_health().get_json()  # Extract JSON data
#             socketio.emit('updateData', health_data)
#             return { "status": "success" }
#         return { "status": "error", "content": "failed to update" }
#     return { "status": "error" }

# @app.route('/player/<string:name>/infos', methods=['POST'])
# def change_info(name):
#     if "name" not in request.json.keys() or "value" not in request.json.keys() :
#         return { "status": "error", "content": "Missing parameters" }
#     if modify_simple_data(name, "infos", request.json["name"], request.json["value"]):
#         return { "status": "success" }
#     return { "status": "error" }

# @app.route('/player/<string:name>/priority', methods=['POST'])
# def change_priority(name):
#     if "name" not in request.json.keys() or "value" not in request.json.keys() :
#         return { "status": "error", "content": "Missing parameters" }
#     if modify_simple_data(name, "priority", request.json["name"], request.json["value"]):
#         return { "status": "success" }
#     return { "status": "error" }

# @app.route('/player/<string:name>/attribute', methods=['POST'])
# def change_attribute(name):
#     if "name" not in request.json.keys() or "value" not in request.json.keys() :
#         return { "status": "error", "content": "Missing parameters" }
#     try:
#         value = int(request.json["value"])
#         if modify_simple_data(name, "attributes", request.json["name"], value):
#             return { "status": "success" }
#     except Exception as e:
#         print(e)
#         return { "status": "error", "content": "Wrong value" }
#     return { "status": "error" }

# @app.route('/player/<string:name>', methods=['GET'])
# def player_data(name):
#     response = {
#         "content": extract_players_from_file(name + ".json"),
#         "status": "success"
#     }
#     if response["content"] == None:
#         return players_health()
#     return jsonify(response)

