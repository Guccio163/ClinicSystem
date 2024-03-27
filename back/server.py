from fastapi import FastAPI
from dotenv import dotenv_values
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# ADD/EDIT/DELETE PATIENT
# LIST PATIENTS
# EACH PATIENT: F_NAME, L_NAME, PESEL, ADDRESS(STREET, CITY, POSTAL_CODE)
# SORTING/SERACH/PAGINATION OF DATA
# do skminy znaczenie cyfr w peselu i wykorzystanie do filtrowania
# dopasowanie do tego ludzi podawanych
# sprawdzanie regexem postal code'u

cred = credentials.Certificate("../firebaseCred.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://assecoclinic-default-rtdb.firebaseio.com'
})
ref = db.reference("/")
ref.set({
    "patients":-1
})
ref = db.reference("/patients")
data = {
	"P1":
	{
		"firstName": "first name 1",
		"lastName": "last name 1",
		"PESEL": "11111111",
		"Address": {
            "city": "city1",
            "street": "street1",
            "postal": "postal1"
        }
	},
	"P2":
	{
		"firstName": "first name 2",
		"lastName": "last name 2",
		"PESEL": "22222222",
		"Address": {
            "city": "city2",
            "street": "street2",
            "postal": "postal2"
        }
	},
	"P3":
	{
		"firstName": "first name 3",
		"lastName": "last name 3",
		"PESEL": "33333333",
		"Address": {
            "city": "city3",
            "street": "street3",
            "postal": "postal3"
        }
	},
	"P4":
	{
		"firstName": "first name 4",
		"lastName": "last name 4",
		"PESEL": "44444444",
		"Address": {
            "city": "city4",
            "street": "street4",
            "postal": "postal4"
        }
	},
}

for book in data:
    ref.push(data[book])

# config = dotenv_values("../.env")
# firebasePass = config.get("PASS")

app = FastAPI()

@app.get("/patients")
async def getPatients():
    data = ref.get()
    return data