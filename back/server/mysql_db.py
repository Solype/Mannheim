import mysql.connector
import time



def get_connection():
    """Établit une connexion à la base de données et la retourne."""
    mydb = mysql.connector.connect(
            host="db",
            # host="localhost",
            user="user",
            password="root",
            database="mannheim",
            port="3306",
            charset="utf8mb4",         # Important pour les caractères spéciaux
            collation="utf8mb4_unicode_ci"
        )
    return mydb

def wait_for_db(timeout: int = 60):
    """Attend que la base de données soit disponible avant de continuer.
    
    Args:
        timeout (int): Temps maximum d'attente en secondes (0 = illimité).
    """
    start_time = time.time()

    while True:
        try:
            connection = get_connection()
            connection.close()
            print("✅ Database is now available!", flush=True)
            return
        except mysql.connector.Error as e:
            print(f"⚠️ Database not available ({e}), retrying in 5 seconds...", flush=True)
            time.sleep(5)

            # Arrête si le temps d'attente dépasse le timeout (sauf si timeout=0)
            if timeout > 0 and (time.time() - start_time) > timeout:
                print("❌ Timeout reached. Could not connect to database.", flush=True)
                return


def execute_query(query: str, params: tuple = (), fetchone: bool = False, commit: bool = False):
    """Exécute une requête SQL avec gestion sécurisée de la connexion et des erreurs."""
    connection = get_connection()
    cursor = connection.cursor()

    try:
        cursor.execute(query, params)

        if commit:
            connection.commit()
            return True

        result = cursor.fetchall()
        return result[0] if fetchone and result else (result if not fetchone else None)

    except Exception as e:
        print(f"Erreur SQL : {e}")
        if commit:
            connection.rollback()
        return None if fetchone else [] if not commit else False

    finally:
        cursor.close()
        connection.close()

def modify_db(query: str, params: tuple) -> bool:
    """Exécute une requête de modification (INSERT, UPDATE, DELETE)."""
    return execute_query(query, params, commit=True)

def getone_db(query: str, params: tuple):
    """Récupère une seule ligne de la base de données."""
    return execute_query(query, params, fetchone=True)

def get_db(query: str, params: tuple):
    """Récupère plusieurs lignes de la base de données."""
    return execute_query(query, params)


