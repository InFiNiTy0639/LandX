from enum import Enum as PyEnum
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Boolean, Enum
from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from dbconn import Base
from Schemas import UserRole
# Database setup

#  User roles





# Create the database tables
#Base.metadata.create_all(bind=engine)

# Pydantic models
class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: str 
    password: str
    role: UserRole
    phoneCode: str | None = None
    phonenum: str | None = None

class UserResponse(BaseModel):
    firstname: str
    lastname: str
    email: str
    phonenum: str | None  
    role: UserRole

class UserInDB(BaseModel):
    firstname: str
    lastname: str
    email: str
    role: UserRole

class Token(BaseModel):
    access_token: str
    user: str
    role: UserRole
    token_type: str

class TokenData(BaseModel):
    username: str | None = None
