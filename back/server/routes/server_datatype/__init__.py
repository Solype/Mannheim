from server.routes.server_datatype.login_type import *
from server.routes.server_datatype.chara_type import *
from server.routes.server_datatype.lore_type import *
from server.routes.server_datatype.user_request_type import *
from server.routes.server_datatype.session_type import *

def packDbElement(classElement: BaseModel, tupleElement: tuple):
    return classElement(**dict(zip(classElement.model_fields.keys(), tupleElement)))
