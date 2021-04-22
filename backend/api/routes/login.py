from flask import Blueprint, request, jsonify
from ..models.query import *

login_bp = Blueprint('login_bp', __name__)

@login_bp.route('/register')
def register():
    data = request.get_json()
    fields = ['given_name', 'family_name', 'email']

    if is_user_registered(data['email']):
        return jsonify({'message': "User exists"}), 200
    else:
        register_user(data['email'], data['given_name'], data['family_name'])
        return jsonify({'message': "User added"}), 200
