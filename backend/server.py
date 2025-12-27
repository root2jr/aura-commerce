from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import bcrypt
import os
from jose import jwt

json = jwt
hash = bcrypt
app = FastAPI()
load_dotenv()
URL = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(URL)
db = client["Aura-Commerce"] 
users_collection = db["users"]
products_collection = db["products"]

origins = [
    "http://localhost:5173",
    "https://aura-commerce.netlify.app"
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
    email: str | None
    password: str
    
class JWTMODEL(BaseModel):
    token: str

class PRODUCT(BaseModel):
    id: str

@app.get("/")
def read_root():
    return {"message": "CORS is enabled, React can fetch this!"}


def create_jwt(username: str):
    new_jwt = json.encode({"username": username}, "jramsecretkey", "HS256")
    return new_jwt

def check_jwt(jwt: str):
    try:
       checked = json.decode(jwt, "jramsecretkey", "HS256")
       return True
    except:
        return False

    
@app.post("/auth")
async def handle_auth(data: AuthModel):
    print(f"Received request: {data.email}")
    existing_user = await users_collection.find_one({"email": data.email})

    if existing_user:
        passw =  existing_user["password"].encode("utf-8")
        curr = data.password.encode("utf-8")
        if hash.checkpw(curr, passw):
             token = create_jwt(data.email)
             return {"status": "success", "message": "Welcome back to The Archive", "user": data.email, "token": token}
        else:
             raise HTTPException(status_code=401, detail="Invalid credentials")
    
    else:
        if data.username:
            hashed_pass =  hash.hashpw(data.password.encode("utf-8"), hash.gensalt())
            new_user = {
                "username": data.username,
                "email": data.email,
                "password": hashed_pass.decode("utf-8")
            }
            await users_collection.insert_one(new_user)
            token = create_jwt(data.email)
            return {"status": "created", "message": "Joined the Cult", "user": data.username, "token": token}
        
        else:
            raise HTTPException(status_code=404, detail="User not found")
        


@app.post("/fetch-products")
async def fetch_products(data:JWTMODEL):
  try:
    checked = check_jwt(data.token)
    if not checked:
        raise HTTPException(status_code=401, detail="Access Denied")
    response = await products_collection.find({}).to_list(length=None)
    for res in response:
        res["_id"] = str(res["_id"])
        
    return{"products": response}
  except:
      raise HTTPException(status_code=402, detail="Server Down")

@app.post("/like")
async def add_liked_products(data:JWTMODEL):
    try:
        response = await users_collection.find_one_and_update({"username": "jram"},{"$inc": {"liked": 1}})
    except:
        raise HTTPException(status_code=401, detail="Access Denied")
    
    
@app.post("/item")
async def fetch_product(data: PRODUCT):
    try:
        response = await products_collection.find_one({"_id": data.id})
        response["_id"] = str(response["_id"])
        return {"product": response}
    except:
        raise HTTPException(status_code=401, detail="Access Denied")
        
