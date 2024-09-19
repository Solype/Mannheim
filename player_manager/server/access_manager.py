from dataclasses import dataclass
import time
import uuid


@dataclass
class User:
    id: int
    time: float

class AccessManager:
    def __init__(self):
        self.tokens : dict[uuid.UUID, User] = {}

    def __generateToken(self) -> str:
        while True:
            token = str(uuid.uuid4())
            if token not in self.tokens.keys():
                return token

    def addToken(self, id: int) -> str:
        new_token = self.__generateToken()
        self.tokens[new_token] = User(id, time.time())
        return new_token

    def getTokenData(self, token: str) -> User | None:
        if not self.isTokenValid(token):
            return None
        return self.tokens[token]

    def isTokenValid(self, token: str) -> bool:
        if token in self.tokens.keys():
            if time.time() - self.tokens[token].time < 3600:
                self.tokens[token].time = time.time()
                print("token valid")
                return True
            else:
                print("token expired")
                del self.tokens[token]
                return False

        print("token not in tokens")
        print(self.tokens, token)
        return False

access_manager = AccessManager()


def verify_header(header: dict):
    if "Authorization" not in header.keys():
        print(__file__, "Authorization not in header")
        return False

    string_token : str = header["Authorization"]
    if not string_token.startswith("Bearer "):
        print(__file__, "Token not starting with 'Bearer'")
        return False

    string_token = string_token[len("Bearer "):]

    if access_manager.isTokenValid(string_token):
        return True
    print(__file__, "Token not valid")
    return False

def execute_route_verify(header: dict, route):
    if verify_header(header) :
        return route()
    return "Unauthentificated", 401
