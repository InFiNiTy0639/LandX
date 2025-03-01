from enum import Enum as PyEnum
from sqlalchemy import Column, Integer, String, Boolean,ForeignKey,DateTime,Enum,Float
from dbconn import Base
from sqlalchemy.orm import relationship
# Database setup


class UserRole(str, PyEnum):
    ADMIN="admin"
    OWNER = "owner"
    TENANT = "tenant"

# Enum for payment types
class PaymentMode(str, PyEnum):
    credit_card = "credit_card"
    debit_card = "debit_card"
    paypal = "paypal"
    bank_transfer = "bank_transfer"

# User model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    hashed_password = Column(String)
    role = Column(Enum(UserRole))
    email = Column(String, unique=True, index=True, nullable=True)
    phoneCode=Column(String)
    phonenum =Column(String)

#user Profile model
class UserProfile(Base):
    __tablename__ = "userprofile"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    profile_pic_url = Column(String)
    govt_id_type = Column(String)
    govt_Id_num = Column(String)
    address = Column(String)
    user_type = Column(String) # if owner - landlord or Agent/broker, if tenant - student or working professional
    profession = Column(String)
    date_joined = Column(DateTime)
    last_login = Column(DateTime)
    is_active = Column(Boolean)
    is_staff = Column(Boolean)
    is_superuser = Column(Boolean)

# User payment model
class UserPayment(Base):
    __tablename__ = "user_payment"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    payment_billno = Column(Integer)
    payment_mode = Column(Enum(PaymentMode))
    payment_status = Column(String)
    payment_amount = Column(Float)
    payment_currency = Column(String)
    payment_date = Column(DateTime)
    payment_description = Column(String)
    payment_reference = Column(String)
    payment_gateway = Column(String)
    payment_receipt = Column(String)
    payment_invoice = Column(String)
    payment_created_on = Column(DateTime)
    payment_updated_on = Column(DateTime)


# Property Model
class PropertyDb(Base):
    __tablename__ = "propertyDb"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    property_title = Column(String)
    property_subtitle = Column(String)
    property_description= Column(String)
    property_type = Column(String)
    property_address = Column(String)
    property_city = Column(String)
    property_state = Column(String)
    property_country = Column(String)
    property_zipcode = Column(String)
    property_govt_id = Column(String)
    property_purchase_price = Column(Integer)
    property_listed_rental_price = Column(Integer)
    property_currency = Column(String)
    property_area = Column(Float)
    property_bedrooms = Column(Integer)
    property_bathrooms = Column(Integer)
    property_bldg_floors= Column(Integer)
    property_floor= Column(Integer)
    property_balcony=Column (Boolean)
    property_furnishing = Column(String)
    property_amenities = Column(String)
    property_rules = Column(String)
    property_status = Column(String)
    property_rating = Column(Integer)
    property_reviews = Column(Integer)
    property_availability = Column(String)
    property_available_from = Column(DateTime)
    property_available_to = Column(DateTime)
    property_created_on = Column(DateTime)
    property_updated_on = Column(DateTime)
    property_requested_rental_term = Column(Integer)
    property_final_rental_price = Column(Integer)

    images = relationship("PropertyImages", back_populates="property")
    videos = relationship("PropertyVideos", back_populates="property")
    leases = relationship("property_lease", back_populates="property")




class PropertyImages(Base):
    __tablename__ = "property_images"
    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey('propertyDb.id'))
    image_url = Column(String)
    image_description = Column(String)

    property = relationship("PropertyDb", back_populates="images")


class PropertyVideos(Base):
    __tablename__ = "property_videos"
    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey('propertyDb.id'))
    video_url = Column(String)
    video_description = Column(String)

    property = relationship("PropertyDb", back_populates="videos")
    
class property_lease(Base):
    __tablename__ = "property_lease"
    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey('propertyDb.id'))
    lease_start_date = Column(DateTime)
    lease_end_date = Column(DateTime)
    lease_term = Column(String)
    lease_installments_num = Column(Integer)
    lease_rental_price = Column(Float)
    lease_currency = Column(String)
    lease_payment_mode = Column(Enum(PaymentMode))
    lease_payment_date= Column(DateTime)
    lease_security_deposit = Column(Float)
    lease_advance_deposit = Column(Float)
    lease_agreement = Column(String)
    lease_agreement_url = Column(String)
    lease_status = Column(String)
    lease_created_on = Column(DateTime)
    lease_updated_on = Column(DateTime)

    property = relationship("PropertyDb", back_populates="leases")


class lease_installments(Base):
    __tablename__ = "lease_installment"
    id = Column(Integer, primary_key=True, index=True)
    lease_id = Column(Integer, ForeignKey('property_lease.id'))
    installment_no = Column(Integer)
    installment_due_date = Column(DateTime)
    installment_payment_date = Column(DateTime)
    installment_amount = Column(Float)
    installment_currency = Column(String)
    installment_status = Column(String)
    installment_created_on = Column(DateTime)
    installment_updated_on = Column(DateTime)




