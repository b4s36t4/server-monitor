import datetime
from fastapi import routing
import psutil, re, uuid, platform, socket

route = routing.APIRouter(tags=["CPU"])


@route.get("/cpu_time")
async def get_cpu_details():
    info = psutil.cpu_times(percpu=False)
    # print(info, dir(info))
    return {"user": info.user, "nice": info.nice, "system": info.system}


@route.get("/cpucount")
async def get_cpu_count():
    count = psutil.cpu_count(logical=True)
    return {"cpu_count": count}


@route.get("/cpu_percent")
async def get_cpu_percent():
    info = psutil.cpu_percent(interval=1.0)
    return {"usage": info, "metric": "percentage"}


@route.get("/cpu_load_by_cpu")
async def get_cpu_load():
    total_load = psutil.getloadavg()
    res = []
    for load in total_load:
        res.append(load / psutil.cpu_count() * 100)
    return {"load_average": res}

@route.get("/sysinfo")
async def get_sys_info():
    res = {}
    res["arch"] = "".join(platform.architecture())
    res["version"] = platform.version()
    res["python_version"] = platform.python_version()
    res["platform"] = platform.platform()
    res["system"] = platform.system()
    res["processor"] = platform.processor()
    res["machine"] = platform.machine()
    res["node"] = platform.node()
    # res["uname"] = platform.uname()
    res["hostname"] = socket.gethostname()
    res["ip"] = socket.gethostbyname(socket.gethostname())
    # res['mac'] = ':'.join(re.findall('..', '%012x' % uuid.getnode()))
    res["boot_time"] = datetime.datetime.fromtimestamp(
        psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S")
    return {"data": res}
