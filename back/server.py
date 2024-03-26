from fastapi import FastAPI
from dotenv import dotenv_values
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("../firebaseCred.json")
# firebase_admin.initialize_app(cred)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://assecoclinic-default-rtdb.firebaseio.com'
})
ref = db.reference("/")
print(ref)
ref.get("/")
data = {
	"Book1":
	{
		"Title": "The Fellowship of the Ring",
		"Author": "J.R.R. Tolkien",
		"Genre": "Epic fantasy",
		"Price": 100
	},
	"Book2":
	{
		"Title": "The Two Towers",
		"Author": "J.R.R. Tolkien",
		"Genre": "Epic fantasy",
		"Price": 100	
	},
	"Book3":
	{
		"Title": "The Return of the King",
		"Author": "J.R.R. Tolkien",
		"Genre": "Epic fantasy",
		"Price": 100
	},
	"Book4":
	{
		"Title": "Brida",
		"Author": "Paulo Coelho",
		"Genre": "Fiction",
		"Price": 100
	}
}

config = dotenv_values("../.env")
app = FastAPI()
firebasePass = config.get("PASS")

@app.get("/patients")
async def getPatients():
    ref.set(data)
    print(ref.get())
    return data