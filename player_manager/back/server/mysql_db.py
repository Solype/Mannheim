import mysql.connector
from time import sleep

mydb = None

for i in range(10):
    try :
        mydb = mysql.connector.connect(
            host="db",
            user="user",
            password="root",
            database="mannheim",
            port="3306",
        )
        break
    except Exception as e:
        print(e, flush=True)
        sleep(3)

if not mydb:
    print("Connection failed !", flush=True)
    exit(1)

cursor : mysql.connector.cursor.MySQLCursor = mydb.cursor()
