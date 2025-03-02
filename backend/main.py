
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from Authetication import authroutes
from OwnerPortal import OwnerRoutes
from dbconn import engine
from Authetication import Authmodels

Authmodels.Base.metadata.create_all(bind=engine)

app=FastAPI()

origins=[
    'http://localhost:3002'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]

)

app.include_router(authroutes.router)
app.include_router(OwnerRoutes.router)


@app.get("/api")
async def root():
    return {"message": "This is from api"} 


