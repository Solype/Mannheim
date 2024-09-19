import sqlite3
from contextvars import ContextVar

class SqliteConnexion:

    def __init__(self):
        self.path = None
        self.connexion = None
        self.cursor = None

    def __enter__(self):
        if not self.path:
            raise ValueError("Database path is not set.")
        self.connexion = sqlite3.connect(self.path, check_same_thread=False)
        self.cursor = self.connexion.cursor()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connexion:
            self.connexion.commit()
            self.connexion.close()
            self.connexion = None
            self.cursor = None

    def __del__(self):
        self.quit()

    def setPath(self, path):
        self.path = path
        if self.connexion:
            self.connexion.close()
        self.connexion = sqlite3.connect(self.path, check_same_thread=False)
        self.cursor = self.connexion.cursor()

    def __validate_connection(self):
        if not self.connexion:
            raise sqlite3.ProgrammingError(f"No database connection. Use setPath() first. Current path: {self.path}")

    def get(self, request, args=None):
        self.__validate_connection()
        try:
            if args:
                self.cursor.execute(request, args)
            else:
                self.cursor.execute(request)
            return self.cursor.fetchall()
        except sqlite3.Error as e:
            print(f"Error during query execution: {e}")
            return None

    def getone(self, request, args=None):
        self.__validate_connection()
        try:
            if args:
                self.cursor.execute(request, args)
            else:
                self.cursor.execute(request)
            return self.cursor.fetchone()
        except sqlite3.Error as e:
            print(f"Error during query execution: {e}")
            return None

    def modify(self, request, args=None):
        self.__validate_connection()
        try:
            if args:
                self.cursor.execute(request, args)
            else:
                self.cursor.execute(request)
            self.connexion.commit()
            return True
        except sqlite3.Error as e:
            print(f"Error during the execution of the modification: {e}")
            self.connexion.rollback()
            return False

    def begin(self):
        self.__validate_connection()
        self.cursor.execute('BEGIN')

    def rollback(self):
        self.__validate_connection()
        self.connexion.rollback()

    def table_exists(self, table_name):
        self.__validate_connection()
        try:
            self.cursor.execute(
                "SELECT name FROM sqlite_master WHERE type='table' AND name=?;", (table_name,)
            )
            return self.cursor.fetchone() is not None
        except sqlite3.Error as e:
            print(f"Error checking table existence: {e}")
            return False

    def quit(self):
        if self.connexion:
            try:
                self.connexion.commit()
            except sqlite3.ProgrammingError:
                print("Cannot commit on a closed database.")
            finally:
                try:
                    self.connexion.close()
                except sqlite3.ProgrammingError:
                    print("Cannot close a closed database.")
                self.connexion = None
                self.cursor = None
                print("Database closed.", self.path)

db = SqliteConnexion()
