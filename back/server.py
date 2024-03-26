from fastapi import FastAPI

app = FastAPI()

@app.get("/patients")
async def getPatients():
    return ["Patient1", "Patient2"]