#This is a temporary file, and will be inserted into "tournament"

from datetime import date, datetime
from flask import Blueprint, request, jsonify
from ..models import query

match_bp = Blueprint('match_bp', __name__)

def existing_fields(data, fields):
    return all(elem in data for elem in fields)


def filled_fields(data, fields):
    for field in fields:
        if not data[field]:
            return False
    return True

@match_bp.route('/create_match', methods=['POST'])
def create_match():
    # take in tournament id, date, time, challenger, defender
    # check if existing and filled fields
    # check challenger and defender are registered as competing in this tournament
    # create the match
    data = request.get_json()
    fields = ['tournament_id', 'date', 'time', 'challenger', 'defender']

    if not existing_fields(data, required_fields):
        return jsonify({'message': "Missing field(s)"}), 400

    if not filled_fields(data, required_fields):
        return jsonify({'message': "Field(s) not filled"}), 400

    if not (query.is_competing(data['challenger'], data['tournament_id']) and query.is_competing(data['defender'], data['tournament_id']):
        return jsonify({'message': 'Challenger and/or defender are not registered in this tournament'}), 400



    return 200
