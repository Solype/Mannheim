import json
import os

def get_player_files():
    files = []
    for file in os.listdir("./players"):
        if file.endswith(".json"):
            files.append(file)
    
    return files

def extract_players_from_file(file):
    f = open("./players/" + file)
    content = f.read()
    python_obj = None
    try:
        f = open("./players/" + file)
        str_data = f.read()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["file"] = file[:-len(".json")]  

    except Exception as e:
        print("Une erreur s'est produite:", e)

    return python_obj

def filter_heath_players(players):
    to_return = []
    for player in players:
        try:
            tmp = {
                "file": player["file"],
                "name": player["name"],
                "physical health": player["monitor"]["physical health"],
                "mental health": player["monitor"]["mental health"],
                "pathological health": player["monitor"]["pathological health"],
                "endurance health": player["monitor"]["endurance health"],
                "mana": player["monitor"]["mana"]
            }
            to_return.append(tmp)
        except Exception as e:
            print("Une erreur s'est produite:", e)
    return to_return

def modify_simple_data(name, section, skill_name, value) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        if section is not None:
            python_obj[section][skill_name] = value
        else :
            python_obj[skill_name] = value
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True
    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False

def add_role(name, section, role_name) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["roles"][section].append(role_name)
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True
    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False

def remove_role(name, section, role_name) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["roles"][section].remove(role_name)
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True
    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False

def modify_monitor(name, section, value) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["monitor"][section][0] = value
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True

    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False

def upgrade_monitor(name, section, value) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["monitor"][section][1] = value
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True

    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False

def remove_god(name, name_god) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["religion"]["gods"].remove(name_god)
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True
    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False

def modify_devotion(name, value) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["religion"]["devotion"] = value
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True
    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False

def add_language(name, language) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["religion"]["language"].append(language)
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True
    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False

def remove_language(name, language) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["religion"]["language"].remove(language)
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True
    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False

def add_god(name, name_god) -> bool:
    try:
        f = open("./players/" + name + ".json", "r")
        str_data = f.read()
        f.close()
        json_data = str_data.replace("'", '"')
        python_obj = json.loads(json_data)
        python_obj["religion"]["gods"].append(name_god)
        f = open("./players/" + name + ".json", "w")
        f.write(json.dumps(python_obj, indent=4))
        f.close()
        return True
    except Exception as e:
        print("Une erreur s'est produite:", e)
        return False
