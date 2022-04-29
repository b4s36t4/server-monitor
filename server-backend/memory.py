import datetime
from fastapi import routing
import psutil, re, uuid, platform, socket
import math
from psutil._common import bytes2human as convert_size

route = routing.APIRouter(tags=["Memory"])

# def convert_size(size_bytes):
#     if size_bytes == 0:
#         return "0B"
#     size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
#     i = int(math.floor(math.log(size_bytes, 1024)))
#     p = math.pow(1024, i)
#     s = round(size_bytes / p, 2)
#     return "%s %s" % (s, size_name[i])


@route.get("/memory_stats")
async def get_avilable_memory():
    memory_info = psutil.virtual_memory()
    res = {}
    # print(memory_info)
    res["total"] = convert_size(memory_info.total)
    res["available"] = convert_size(memory_info.available)
    res["precentage"] = memory_info.percent

    return res


@route.get("/swap_stats")
async def swap_mem_stats():
    swap_info = psutil.swap_memory()
    res = {}
    res["total"] = convert_size(swap_info.total)
    res["free"] = convert_size(swap_info.free)
    res["used"] = convert_size(swap_info.used)
    return res
