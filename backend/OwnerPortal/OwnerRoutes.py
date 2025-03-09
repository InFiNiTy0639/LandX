

from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session 
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated, List
from datetime import datetime, timedelta

from Authetication.authmethods import get_current_user
from OwnerPortal import OwnerMethod
from .OwnerModels import CreateOProfile, InstallmentResponse, Installmentcreate, LeaseCreate, Leaseresponse, ProfileOresponse, PropertyCreate, Propertyresponse, PropertyBase, showPropertieslist
from dbconn import SessionLocal
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from Schemas import PropertyDb, PropertyImages,PropertyVideos, User, UserProfile
import os



#from pdfrw import PdfReader, PdfWriter, PdfDict


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(

prefix="/api/v1/Owner",
tags=['Owner']
)

router.mount("/static", StaticFiles(directory="static"), name="static")

# Endpoint to add property details and images

@router.post("/properties/", response_model=Propertyresponse)
async def create_property(property: PropertyCreate,images: List[UploadFile] = File(...), db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
  
    # Save property details to the database
    db_property = PropertyDb(
    user_id = current_user.id,
    property_title=property.property_title,
    property_subtitle = property.property_subtitle,
    property_description= property.property_description,
    property_type = property.property_type,
    property_address = property.property_address,
    property_city = property.property_city,
    property_state = property.property_state,
    property_country = property.property_country,
    property_zipcode = property.property_zipcode,
    property_govt_id = property.property_govt_id,
    property_purchase_price = property.property_purchase_price,
    property_listed_rental_price = property.property_listed_rental_price,
    property_currency = property.property_currency,
    property_area = property.property_area,
    property_bedrooms = property.property_bedrooms,
    property_bathrooms = property.property_bathrooms,    
    property_furnishing = property.property_furnishing,
    property_bldg_floors= property.property_bldg_floors,
    property_floor=property.property_floor,
    property_amenities = property.property_amenities,
    property_rules = property.property_rules,
    property_status = property.property_status,
    property_availability =property.property_availability,
    property_available_from = property.property_available_from,
    property_available_to = property.property_available_to,
    property_created_on = datetime.now(),
    )

    db.add(db_property)
    
    db.commit()
    db.refresh(db_property)

    # Save uploaded images
    image_urls = []
    for image in images:
        # Save the image to the "static" directory
        ImageFolder=f"static/prop_images/{db_property.id}/"
        os.makedirs(ImageFolder,exist_ok=True)
        file_path = os.path.join(ImageFolder, image.filename) # type: ignore
       # file_path = f"static/prop_images/{db_property.id}/{image.filename}"
        with open(file_path, "wb") as buffer:
            buffer.write(await image.read())
        
        # Save the image URL to the database
        db_image = PropertyImages(property_id=db_property.id, image_url=file_path, image_description=property.property_description,)
        db.add(db_image)
       # image_urls.append(f"/static/{image.filename}")
        image_urls.append(file_path)

    db.commit()
    db.refresh(db_image)

    return {"id": db_property.id,"created_at":db_property.property_created_on, "images": image_urls}


@router.get("/allproperties/")#,response_model=showPropertieslist)
async def ListAllproperties(db:Session=Depends(get_db)):#,current_user:User= Depends(get_current_user)):
   return OwnerMethod.ListAllproperties(db)#,current_user)

@router.get("/User_properties/")#,response_model=List[showPropertieslist])
async def List_User_properties(db:Session=Depends(get_db),current_user:User= Depends(get_current_user)):
   return OwnerMethod.List_User_properties(db,current_user)


@router.get("/{id}")#,response_model=Propertyresponse)
async def display_property_by_id(id:str,db:Session=Depends(get_db),current_user:User= Depends(get_current_user)):
    return OwnerMethod.display_property_by_id(id,db)


@router.delete("/{id}",status_code=status.HTTP_204_NO_CONTENT)
async def DeleteProperty(id:str,db:Session=Depends(get_db),current_user:User= Depends(get_current_user)):
    return OwnerMethod.DeleteProperty(id,db)


@router.put("/{id}",status_code=status.HTTP_202_ACCEPTED,)
async def updatePropertyDeatials(id:str,request:PropertyCreate,db:Session=Depends(get_db),current_user:User= Depends(get_current_user)):
    return OwnerMethod.updatePropertyDeatials(id,db,request)


@router.put("/propimage/{id}",status_code=status.HTTP_202_ACCEPTED,)
async def updatePropertypictures(id:str,image:UploadFile=File(...),db:Session=Depends(get_db),current_user:User= Depends(get_current_user)):
  return await OwnerMethod.updatePropertypictures(id,image,db)


@router.post("/createlease/{prop_id}", response_model=Leaseresponse)
async def create_lease(id:str,requestlease: LeaseCreate, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
  return OwnerMethod.create_lease(id,requestlease,db)

@router.post("/createInstallments/{lease_id}", response_model=InstallmentResponse)
async def create_installment(lease_id:str,requestIntallments: Installmentcreate, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
  return OwnerMethod.create_installment(lease_id,requestIntallments,db)

@router.post("/createoprofile/{usr_id}", response_model=ProfileOresponse)
async def create_owner_profile(id:int,requestprofile: CreateOProfile,Userpic: UploadFile = File(), db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
  return await OwnerMethod.create_owner_profile(id,requestprofile,Userpic,db)

#@router.post("/createlease_doc/{lease_id}",response_model=leasedocResponse)
#async def create_lease_doc(id:int,request:create_lease_doc, pdf_file:UploadFile = File(), db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
#   return create_lease_doc(id,request,pdf_file )


@router.get("/me", response_model=ProfileOresponse)
async def get_owner_profile(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile






