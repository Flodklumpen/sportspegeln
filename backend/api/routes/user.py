from flask import Blueprint, request, jsonify
from ..models import query
from . import routes_help

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    fields = ['given_name', 'family_name', 'email']

    if not routes_help.existing_fields(data, fields):
        return jsonify({'message': "Missing field(s)"}), 400

    if not routes_help.filled_fields(data, fields):
        return jsonify({'message': "Field(s) not filled"}), 400

    if query.is_user_registered(data['email']):
        return jsonify({'message': "User exists"}), 200
    else:
        query.register_user(data['email'], data['given_name'], data['family_name'])
        return jsonify({'message': "User added"}), 200


@user_bp.route('/get_user_info', methods=['GET'])
def get_user_info():
    email = request.args.get('email')
    if not email:
        return jsonify({'message': 'Missing parameter'}), 400

    user_info = query.get_user_info(email)

    if user_info is None:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({'message': "User found", "data": user_info}), 200
