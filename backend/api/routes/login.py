from flask import Blueprint, request, jsonify
from ..models.query import *

login_bp = Blueprint('login_bp', __name__)

def existing_fields(data, fields):
    return all(elem in data for elem in fields)


def filled_fields(data, fields):
    for field in fields:
        if not data[field]:
            return False
    return True


@login_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    fields = ['given_name', 'family_name', 'email']

    if not existing_fields(data, fields):
        return jsonify({'message': "Missing field(s)"}), 400

    if not filled_fields(data, fields):
        return jsonify({'message': "Field(s) not filled"}), 400

    if is_user_registered(data['email']):
        return jsonify({'message': "User exists"}), 200
    else:
        register_user(data['email'], data['given_name'], data['family_name'])
        return jsonify({'message': "User added"}), 200
