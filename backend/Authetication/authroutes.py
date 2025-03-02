from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from datetime import timedelta
from .authmethods import authenticate_user, create_access_token, create_user, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from .Authmodels import UserCreate, UserInDB, Token, UserResponse, UserRole
from Schemas import User
from dbconn import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(
    prefix="/auth",
    tags=['Authentication']
)

# JWT Configuration
# SECRET_KEY = "your-secret-key"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Owner Signup
@router.post("/OwnerSignup", response_model=UserResponse)
def register_owner(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user.role = UserRole.OWNER
    db_user = create_user(db=db, user=user)
    return UserResponse(
        firstname=db_user.firstname, # type: ignore
        lastname=db_user.lastname, # type: ignore
        email=db_user.email, # type: ignore
        phonenum=db_user.phonenum, # type: ignore
        role=db_user.role # type: ignore
    )

# Tenant Signup
@router.post("/TenantSignup", response_model=UserResponse)
def register_tenant(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    user.role = UserRole.TENANT
    db_user = create_user(db=db, user=user)
    return UserResponse(
        firstname=db_user.firstname, # type: ignore
        lastname=db_user.lastname, # type: ignore
        email=db_user.email, # type: ignore
        phonenum=db_user.phonenum, # type: ignore
        role=db_user.role # type: ignore
    ) 

# Owner Login
@router.post("/Ownerlogin", response_model=Token)
def owner_login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user or user.role != UserRole.OWNER: # type: ignore
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials or not an Owner",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email, "role": user.role}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "user": f"{user.firstname} {user.lastname}", "role": user.role, "token_type": "bearer"}

# Tenant Login
@router.post("/Tenantlogin", response_model=Token)
def tenant_login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, request.username, request.password)

    if not user or user.role != UserRole.TENANT: # type: ignore
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials or not a Tenant",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    
    return {"access_token": access_token, "user": f"{user.firstname} {user.lastname}", "role": user.role, "token_type": "bearer"}

# Fetch Logged-in User
@router.get("/me", response_model=UserInDB)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return UserInDB(firstname=current_user.firstname, lastname=current_user.lastname, email=current_user.email, role=current_user.role) # type: ignore

# Owner Protected Route
@router.get("/owner")
async def owner_only(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.OWNER: # type: ignore
        raise HTTPException(status_code=403, detail="Owner access required")
    return {"message": "Welcome, owner!"}

# Owner Protected Route
@router.get("/tenant")
async def tenant_only(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.TENANT: # type: ignore
        raise HTTPException(status_code=403, detail="Tenant access required")
    return {"message": "Welcome, tenant!"}