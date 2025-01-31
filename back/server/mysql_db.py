import mysql.connector
from time import sleep

mydb = None

for i in range(10):
    try :
        mydb = mysql.connector.connect(
            # host="db",
            host="localhost",
            user="user",
            password="root",
            database="mannheim",
            port="3306",
            charset="utf8mb4",         # Important pour les caractères spéciaux
            collation="utf8mb4_unicode_ci"
        )
        break
    except Exception as e:
        print(e, flush=True)
        sleep(3)

if not mydb:
    print("Connection failed !", flush=True)
    exit(1)

cursor : mysql.connector.cursor.MySQLCursor = mydb.cursor()

def modify_db(query: str, params: tuple):
    try:
        cursor.execute(query, params)
        mydb.commit()
        return True
    except Exception as e:
        print(f"Erreur lors de la modification de la base de données : {e}")
        mydb.rollback()
        return False

def getone_db(query: str, params: tuple):
    try:
        cursor.execute(query, params)
        result = cursor.fetchall()
        if len(result) == 0:
            return None
        result = result[0]
        return result
    except Exception as e:
        print(f"Erreur lors de la récupération d'une ligne : {e}")
        return None

def get_db(query: str, params: tuple):
    try:
        cursor.execute(query, params)
        result = cursor.fetchall()
        return result
    except Exception as e:
        print(f"Erreur lors de la récupération des résultats : {e}")
        return []


