from typing import Union
from fastapi import routing
import psutil
import os
from psutil._common import bytes2human as convert_size
from pydantic import BaseModel

route = routing.APIRouter(tags=["Process"])


@route.get("/processes")
async def get_processes():
    processes = psutil.process_iter()
    data = []
    for proceess in processes:
        # print(proceess)
        try:
            pinfo = proceess.as_dict(attrs=['pid', 'memory_percent', 'name', 'cpu_times', 'create_time', 'memory_info'])
            pinfo['memory'] = proceess.memory_info().vms 
            data.append(pinfo)
        except:
            pass
    data.sort(key=lambda x: x["memory_percent"], reverse=True)
    # top_10 = data[:20]
    # top_10.sort(key=lambda x: x["memory_percent"], reverse=True)
    return data[:20]

class Process(BaseModel):
    pid: Union[str, int]

@route.post("/kill_process")
async def kill_process(process: Process):
    is_process_exisit = psutil.pid_exists(int(process.pid))
    if not is_process_exisit:
        return {"message":"No Process exists with that ID"}
    else:
        try:
            os.system(f"kill {process.pid}")
            return {"message":"Process has been Killed!", "success": True}
        except Exception as e:
            print(e)
            return {"message":"error","e":str(e)}