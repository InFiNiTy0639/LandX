from datetime import datetime
import os
from typing import List
from fastapi import APIRouter,Depends, File,HTTPException, UploadFile,status
from sqlalchemy.orm import Session
from Schemas import User,PropertyDb,PropertyImages, UserProfile, lease_installments, property_lease
from OwnerPortal.OwnerModels import CreateOProfile, Installmentcreate, LeaseCreate, PropertyCreate
import shutil
from dateutil.relativedelta import relativedelta # type: ignore

async def create_property(db:Session,property:PropertyCreate,current_user:User,images:List[UploadFile] ):

    # Save property details to the database
    db_property = PropertyDb(
    user_id = current_user.id,
    property_title=property.title, # type: ignore
    property_subtitle = property.subtitle, #type: ignore
    property_description= property.description, # type: ignore
    property_type = property.type, # type: ignore
    property_address = property.address, # type: ignore
    property_city = property.city, # type: ignore
    property_state = property.state, # type: ignore
    property_country = property.country, # type: ignore
    property_zipcode = property.zipcode, # type: ignore
    property_govt_id = property.govt_id, # type: ignore
    property_purchase_price = property.purchase_price, # type: ignore
    property_listed_rental_price = property.listed_rental_price, # type: ignore
    Property_currency = property.currency, # type: ignore
    property_area = property.area, # type: ignore
    property_bedrooms = property.bedrooms, # type: ignore
    property_bathrooms = property.bathrooms,     # type: ignore
    property_furnishing = property.furnishing, # type: ignore
    property_amenities = property.amenities, # type: ignore
    property_rules = property.rules, # type: ignore
    property_status = property.status, # type: ignore
    property_availability =property.availability, # type: ignore
    property_available_from = property.available_from, # type: ignore
    property_available_to = property.available_to, # type: ignore
    property_created_on = datetime.now(),
    )

    db.add(db_property)
    
    db.commit()
    db.refresh(db_property)

    # Save uploaded images
    image_urls = []
    for image in images:
        # Save the image to the "static" directory
        file_path = f"static/{image.filename}"
        with open(file_path, "wb") as buffer:
            buffer.write(await image.read())
        
        # Save the image URL to the database
        db_image = PropertyImages(property_id=db_property.id, image_url=f"/static/{image.filename}", image_description=property.image_description) # type: ignore
        db.add(db_image)
        image_urls.append(f"/static/{image.filename}")

    db.commit()
    db.refresh(db_image)
    return {"id": db_property.id,"created_at":db_property.property_created_on, "images": image_urls}


def ListAllproperties(db:Session):#, Curr_user:User):
    all_properties=db.query(PropertyDb).filter().all()#(PropertyDb.user_id==Curr_user.id).all()
    return all_properties

def List_User_properties(db:Session, Curr_user:User):
    all_properties=db.query(PropertyDb).filter(PropertyDb.user_id==Curr_user.id).all()
    return all_properties


def display_property_by_id(id:str,db:Session):
    query_property=db.query(PropertyDb).filter(PropertyDb.id==id).first()
    if not query_property:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"Property for id: {id} not found")
    query_image=db.query(PropertyImages).filter(PropertyImages.property_id==query_property.id).all()
    query_image=[{"image_url":image.image_url,"id":image.id} for image in query_image]
    return {"property_info":query_property,"images":query_image}


def DeleteProperty(id:str,db:Session):
    Prop_records=db.query(PropertyDb).filter(PropertyDb.id==id)
    if not Prop_records.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"this id: {id} not found")
    
    Prop_records.delete(synchronize_session=False)
    #db.refresh(Prop_records)

    Prop_images=db.query(PropertyImages).filter(PropertyImages.property_id==id)
    Prop_images.delete(synchronize_session=False)
    db.commit()
    
    ImageFolder=f"static/prop_images/{id}/"
    #for image in Prop_images:
    foldername = os.path.dirname(ImageFolder)
        #os.rmdir(foldername)
    shutil.rmtree(foldername)
        #image_path=image.image_url.split("/")[-1]
        #os.remove(f"static/{image_path}")       
   
    
  #  db.refresh(Prop_images)
    return {"message":"deleted"}


def updatePropertyDeatials(id:str,db:Session,request: PropertyCreate):
    records=db.query(PropertyDb).filter(PropertyDb.id==id).first()
    if not records:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"this id: {id} not found")

    for key, value in request.dict().items():
        setattr(records, key, value)
    
    #records.update(request.dict())

    db.commit()
    db.refresh(records)
    return "updated" 

async def updatePropertypictures(id:str,db_image:UploadFile,db:Session):
    imagerec=db.query(PropertyImages).filter(PropertyImages.id==id).first()
    if not imagerec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"this id: {id} not found")

    image_path=imagerec.image_url.split("/")[-1]
    os.remove(f"static/prop_images/{imagerec.property_id}/{image_path}")  
   
    # Save the image to the "static" directory
    file_path = f"static/prop_images/{imagerec.property_id}/{db_image.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(await db_image.read())
    key="image_url"
    setattr(imagerec, key, file_path)

    db.commit()
    db.refresh(imagerec)
    return "updated" 


def create_lease(id:str,requestlease: LeaseCreate, db: Session ):

    # Save property details to the database
    db_lease = property_lease(
    property_id = id,
    lease_start_date = requestlease.lease_start_date,
    lease_end_date = requestlease.lease_end_date,
    lease_term = requestlease.lease_term,
    lease_installments_num = requestlease.lease_installments_num,
    lease_rental_price = requestlease.lease_rental_price,
    lease_currency = requestlease.lease_currency,
    lease_payment_mode = requestlease.lease_payment_mode,
    lease_payment_date = requestlease.lease_payment_date,
    lease_security_deposit = requestlease.lease_security_deposit,
    lease_advance_deposit = requestlease.lease_advance_deposit,
    lease_agreement = requestlease.lease_agreement,
    lease_agreement_url = requestlease.lease_agreement_url,
    lease_status = requestlease.lease_status,
    lease_created_on = datetime.now()
    )

    db.add(db_lease)
    
    db.commit()
    db.refresh(db_lease)
    return {"id": db_lease.id,"created_on":db_lease.lease_created_on}

def create_installment(id:str,requestIntallments:Installmentcreate,db:Session):
    num_installments=requestIntallments.num_of_installments
    lease_start_date=requestIntallments.lease_start_date
    lease_terms=requestIntallments.lease_term
    rent_amt=requestIntallments.lease_rent_ammount
    rent_currency=requestIntallments.rent_currency
    
    install_due_date=lease_start_date

    records=db.query(lease_installments).filter(lease_installments.lease_id==id)
    if not records.first():

        if (lease_terms== "Annual" and num_installments>1 ):
            install_length=12/num_installments
            install_amt=rent_amt/install_length
            for x in range(1,num_installments,1):
                
                db_installmnt=lease_installments(
                    lease_id = id,
                    installment_no = x,
                    installment_due_date = install_due_date,
                    installment_amount = install_amt,
                    installment_currency = rent_currency,
                    installment_created_on = datetime.today()
                    

                )
                db.add(db_installmnt)
                install_due_date=install_due_date+relativedelta(months=install_length) # type: ignore
            
                
        else:
            db_installmnt=lease_installments(
                    lease_id = id,
                    installment_no = 1,
                    installment_due_date = install_due_date,
                    installment_amount = rent_amt,
                    installment_currency = rent_currency,
                    installment_created_on = datetime.today()
                    

                )
            db.add(db_installmnt)
            
        db.commit()   
        db.refresh(db_installmnt)
        return {"id": db_installmnt.id,"created_on":db_installmnt.installment_created_on}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"Installment plan for this lease already exist")
        #return {"id":0,"created_on":datetime.today()}
        






async def create_owner_profile(id:int,requestProfile:CreateOProfile,Userpic: UploadFile, db: Session ):
    print("Received profile data:", requestProfile.dict(), "File:", Userpic.filename)
    ImageFolder=f"static/user_pics/{id}/"
    os.makedirs(ImageFolder,exist_ok=True)
    file_path = os.path.join(ImageFolder, Userpic.filename) # type: ignore
    # Save property details to the database
    db_profile = UserProfile(
    user_id = id,
    profile_pic_url = file_path,
    govt_id_type = requestProfile.govt_id_type,
    govt_Id_num = requestProfile.govt_Id_num,
    address = requestProfile.address,
    user_type = requestProfile.user_type, # if owner - landlord or Agent/broker, if tenant - student or working professional
    profession = requestProfile.profession,
    date_joined = requestProfile.date_joined,
    last_login = datetime.now(),
    is_active = requestProfile.is_active,
    is_staff = requestProfile.is_staff,
    is_superuser = requestProfile.is_superuser
    )

    db.add(db_profile)
    
    db.commit()
    db.refresh(db_profile)    
  
    with open(file_path, "wb") as buffer:
            buffer.write(await Userpic.read())

    return {"id": db_profile.id,"date_joined":db_profile.date_joined}