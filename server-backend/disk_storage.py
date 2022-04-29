import datetime
from fastapi import routing
import psutil
import os
from psutil._common import bytes2human as convert_size

route = routing.APIRouter(tags=["Storage"])


@route.get("/partitions")
async def get_partitions():
    res = []
    # for partition in psutil.disk_partitions(all=False):
    #     if os.name == 'nt':
    #         if 'cdrom' in part.opts or part.fstype == '':
    #             # skip cd-rom drives with no disk in it; they may raise
    #             # ENOENT, pop-up a Windows GUI error for a non-ready
    #             # partition or just hang.
    #             continue
    p_res = {}
    usage = psutil.disk_usage("/")
    p_res["mount_point"] = "/"
    p_res["total"] = convert_size(usage.total)
    p_res["used"] = convert_size(usage.used)
    p_res["free"] = convert_size(usage.free)
    p_res["percent"] = convert_size(usage.percent)
    res.append(p_res)
    return res


@route.get("/iostats")
async def get_io_stats():
    res = {}
    info = psutil.disk_io_counters()
    res["reads"] = info.read_count
    res["writes"] = info.write_count
    return res
