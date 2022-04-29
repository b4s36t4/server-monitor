from fastapi import routing
import psutil
import os
from psutil._common import bytes2human as convert_size

route = routing.APIRouter(tags=["Misc"])


@route.get("/users")
async def get_users():
    res = []
    users = psutil.users()
    for user in users:
        x = {}
        x["user"] = user.name
        x["terminal"] = user.terminal
        x["started"] = user.started
        x["pid"] = user.pid
        res.append(x)
    return res