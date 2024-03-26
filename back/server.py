from fastapi import FastAPI
from dotenv import dotenv_values

config = dotenv_values("../.env")
app = FastAPI()
firebasePass = config.get("PASS")

@app.get("/patients")
async def getPatients():
    return ["Patient1", "Patient2", firebasePass]