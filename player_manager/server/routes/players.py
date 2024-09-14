from server.server import app
from server.utils import extract_players_from_file

@app.route('/players')
def players():
    return "players", 200