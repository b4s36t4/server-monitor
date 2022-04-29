import re
import socket
import uuid
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil, platform
from cpu import route as cpu_route
from memory import route as memory_router
from disk_storage import route as disk_router
from network import route as network_router
from misc import route as misc_router
from process import route as process_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/version")
async def get_version():
    return {"version": "1.0.1", "by": "fastapi"}


app.include_router(memory_router)
app.include_router(cpu_route)
app.include_router(disk_router)
app.include_router(network_router)
app.include_router(misc_router)
app.include_router(process_router)


