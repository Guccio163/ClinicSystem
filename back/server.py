from fastapi import FastAPI
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from fastapi.middleware.cors import CORSMiddleware


cred = credentials.Certificate("../firebaseCred.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://assecoclinic-default-rtdb.firebaseio.com'
})
ref = db.reference("/patients")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"], 
    allow_headers=["*"],
)

from pydantic import BaseModel

@app.get("/patients")
async def getPatients():
    data = ref.get()
    result = [[xd, data[xd]] for xd in data]
    return result

class Patient(BaseModel):
    firstName:str
    lastName:str
    pesel:str
    city: str
    street: str
    postal: str

@app.post("/addpatient")
async def addPatient(patient: Patient):
    ref.push({
		"firstName": patient.firstName,
		"lastName": patient.lastName,
		"PESEL": patient.pesel,
		"Address": {
            "city": patient.city,
            "street": patient.street,
            "postal": patient.postal
        }
	})

@app.put("/editPatient/{id}")
async def editPatient(patient:Patient, id:str):
    print(patient.city)
    ref.child(id).update({
		"firstName": patient.firstName,
		"lastName": patient.lastName,
		"PESEL": patient.pesel,
		"Address": {
            "city": patient.city,
            "street": patient.street,
            "postal": patient.postal
        }
	})

@app.delete("/deletePatient/{id}")
async def deletePatient(id: str):
    ref.child(id).set({})
