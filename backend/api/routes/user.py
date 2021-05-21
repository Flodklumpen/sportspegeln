from flask import Blueprint, request, jsonify
from ..models import query
from . import routes_help

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/register', methods=['POST'])
def register():
    """
    Checks if a given user is in the database, else creates the user.
    """
    data = request.get_json()
    fields = ['given_name', 'family_name', 'email', 'user_id']

    if not routes_help.existing_fields(data, fields):
        return jsonify({'message': "Missing field(s)"}), 400

    if not routes_help.filled_fields(data, fields):
        return jsonify({'message': "Field(s) not filled"}), 400

    if query.is_user_registered(data['email']):
        return jsonify({'message': "User exists"}), 200

    else:
        query.register_user(data['email'], data['given_name'], data['family_name'], data['user_id'])
        return jsonify({'message': "User added"}), 200


@user_bp.route('/get_user_data', methods=['GET'])
def get_user_data():
    """
    Returns the user data connected to a given email.
    """
    email = request.args.get('email')

    if not email:
        return jsonify({'message': 'Missing parameter'}), 400

    user_info = query.get_user_data(email)

    if user_info is None:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({'message': "User found", "data": user_info}), 200
