import mysql.connector
from mysql.connector import Error

try:
    # Connexion à MySQL
    connection = mysql.connector.connect(
        host='127.0.0.1',         # L'hôte est local car on se connecte depuis la machine
        port=3306,                # Port exposé du conteneur Docker
        user='root',              # Utilisateur root (ou autre si vous avez modifié)
        password='root',  # Mot de passe de l'utilisateur root
        database='mannheim'     # Nom de la base de données (si vous en avez une)
    )

    if connection.is_connected():
        print("Connexion réussie à la base de données MySQL")

        # Exécution d'une requête pour vérifier
        cursor = connection.cursor()
        cursor.execute("SELECT DATABASE();")
        db = cursor.fetchone()
        print("Connecté à la base de données : ", db)

except Error as e:
    print("Erreur lors de la connexion à MySQL", e)

finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print("Connexion fermée")
