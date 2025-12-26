from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import bcrypt
import os


hash = bcrypt
app = FastAPI()
load_dotenv()
URL = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(URL)
db = client["METRIQ"] 
users_collection = db["users"]

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AuthModel(BaseModel):
    username: str
    password: str

@app.get("/")
def read_root():
    return {"message": "CORS is enabled, React can fetch this!"}

@app.post("/auth")
async def handle_auth(data: AuthModel):
    print(f"Received request: {data.username}")
    existing_user = await users_collection.find_one({"username": data.username})

    if existing_user:
        passw =  existing_user["password"].encode("utf-8")
        curr = data.password.encode("utf-8")
        if hash.checkpw(curr, passw):
             return {"status": "success", "message": "Welcome back to The Archive", "user": data.username}
        else:
             raise HTTPException(status_code=401, detail="Invalid credentials")
    
    else:
        if data.username:
            hashed_pass =  hash.hashpw(data.password.encode("utf-8"), hash.gensalt())
            new_user = {
                "username": data.username,
                "password": hashed_pass.decode("utf-8")
            }
            await users_collection.insert_one(new_user)
            return {"status": "created", "message": "Joined the Cult", "user": data.username}
        
        else:
            raise HTTPException(status_code=404, detail="User not found")

