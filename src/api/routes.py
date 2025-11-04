"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/token', methods = ['POST'])
def generate_token():

  email = request.json.get("email", None)
  password = request.json.get("password", None)

  email = email.lower()
  user = User.query.filter_by(email=email).first()

  if user is None:
   return jsonify({'message': "Email or Password do not match"}), 401

  
  elif user is not None and user.password !=password:
   return jsonify({'message': "Email or password do not match"}), 401


  
  #the user does exist and the email/password matches
  access_token = create_access_token(identity=user.id)

 
  response = {
      'access_token': access_token,
      'user_id': user.id,
      'message': f'Welcome {user.email}!'
    }
  


  return jsonify(response), 200

@api.route('/signup', methods=['POST'])
def new_signup():
 #login credentials
 email = request.json.get("email", None)
 password = request.json.get("password", None)




#query the DB to check if th email already exist
 email = email.lower()
 user = User.query.filter_by(email=email).first()

 if user is not None and user.email == email:
  response = {
   "message": f'{user.email} already exists. Please log in.'
  }
  return jsonify(response), 403
 
 new_user = User()
 new_user.email = email
 new_user.password = password
 new_user.is_active = True
 db.session.add(new_user)
 db.session.commit()

 response = {
  "message": f'{new_user.email} was successfully added! Please log in.'
 }

 return jsonify(response), 201