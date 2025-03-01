import json
from pydantic import BaseModel, model_validator
from typing import List, Optional
from datetime import datetime

from Schemas import PaymentMode

# Pydantic model for property details
class PropertyBase(BaseModel):
    property_title: str
    property_subtitle : str
    property_description: str
    property_type : str
    property_address : str
    property_city : str
    property_state : str
    property_country : str
    property_zipcode : str
    property_govt_id : str
    property_purchase_price : int
    property_listed_rental_price : int
    property_currency : str
    property_area : float
    property_bedrooms : int
    property_bathrooms : int
    property_bldg_floors: int
    property_floor:int
    property_balcony: bool
    property_furnishing : str
    property_amenities : str
    property_rules : str
    property_status : str
    property_availability : str
    property_available_from : datetime
    property_available_to : datetime
    property_image_description : str = None # type: ignore



# Pydantic model for creating a property
class PropertyCreate(PropertyBase):
    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value

# Pydantic model for returning property details
class Propertyresponse(BaseModel):
    id: int
    created_at: datetime   
    images: List[str]  # List of image URLs

    class Config:
        from_attributes = True

# show property list
class showPropertieslist(PropertyBase):
    
    class Config:
        from_attributes=True


class LeaseBase(BaseModel):
    lease_start_date : datetime
    lease_end_date : datetime
    lease_term : str
    lease_installments_num : int
    lease_rental_price : float
    lease_currency : str
    lease_payment_mode : PaymentMode
    lease_payment_date : datetime
    lease_security_deposit :float
    lease_advance_deposit : float
    lease_agreement : str
    lease_agreement_url :str
    lease_status :str

class LeaseCreate(LeaseBase):
    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value

class Leaseresponse(BaseModel):
    id: int
    created_on: datetime   

    class Config:
        from_attributes = True

class showLease(LeaseBase):
    
    class Config:
        from_attributes=True


class installments(BaseModel):
    
    num_of_installments : int
    lease_start_date:datetime
    lease_term: str
    lease_rent_ammount : float
    rent_currency :str
    

class Installmentcreate(installments):
    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class InstallmentResponse(BaseModel):
    id: int
    created_on: datetime   

    class Config:
        from_attributes = True

class OwnerProfile(BaseModel):
    
 
    govt_id_type :str
    govt_Id_num :str
    address :str
    user_type :str # if owner - landlord or Agent/broker, if tenant - student or working professional
    profession :str
    date_joined :datetime
    
    is_active :bool
    is_staff :bool
    is_superuser :bool

class CreateOProfile(OwnerProfile):
    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
    
class ProfileOresponse(BaseModel):
    id: int
    date_joined: datetime   

    class Config:
        from_attributes = True

