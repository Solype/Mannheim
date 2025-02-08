from typing import Optional
import time
import uuid
from pydantic import BaseModel

class UserTokenLink(BaseModel):
    id: int
    time: float

class AccessManager:
    def __init__(self):
        self.tokens : dict[uuid.UUID, UserTokenLink] = {}

    def __generateToken(self) -> str:
        token_to_remove = []
        for token in self.tokens.keys():
            if time.time() - self.tokens[token].time > 3600:
                token_to_remove.append(token)
        for token in token_to_remove:
            del self.tokens[token]
        while True:
            token = str(uuid.uuid4())
            if token not in self.tokens.keys():
                return token

    def addToken(self, id: int) -> str:
        new_token = self.__generateToken()
        self.tokens[new_token] = UserTokenLink(
            id=id,
            time=time.time()
        )
        return new_token

    def getTokenData(self, token: str) -> Optional[UserTokenLink]:
        if not self.isTokenValid(token):
            return None
        return self.tokens[token]

    def isTokenValid(self, token: str) -> bool:
        if token in self.tokens.keys():
            if time.time() - self.tokens[token].time < 3600:
                self.tokens[token].time = time.time()
                return True
            else:
                print("token expired")
                del self.tokens[token]
                return False

        print("token not in tokens")
        print(self.tokens, token)
        return False

    def removeToken(self, token: str):
        if token in self.tokens.keys():
            del self.tokens[token]

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
