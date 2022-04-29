from fastapi import routing
import psutil
import os
from psutil._common import bytes2human as convert_size

route = routing.APIRouter(tags=["Network"])

@route.get("/connections")
async def get_connections():
    connections = psutil.net_if_addrs().items()
    res = []
    for connection in connections:
        i = {}
        nic, addr = connection
        # print(addr[0])
        i["network"] = nic
        i["address"] = addr[0].address
        i["broadcast"] = addr[0].broadcast
        res.append(i)
        # break
    return res
