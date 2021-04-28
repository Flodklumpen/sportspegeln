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

def get_date_from_string(string_date):
    """
    Ensures that the given date is on format YYYY-MM-DD
    """
    try:
        date = datetime.strptime(string_date, '%Y-%m-%d').date()
        return date
    except ValueError:
        return None

def get_time_from_string(string_time):
    """
    Ensures that the given date is on format YYYY-MM-DD
    """
    try:
        time = datetime.strptime(string_time, '%H-%M').time()
        return time
    except ValueError:
        return None

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

    # check so that both challenger and defender are registered in the tournament
    # this also ensures that they are both users
    if not (query.is_competing(data['challenger'], data['tournament_id']) and query.is_competing(data['defender'], data['tournament_id'])):
        return jsonify({'message': 'Challenger and/or defender are not registered in this tournament'}), 400

    #check that tournament exists

    date = get_date_from_string(data['date'])
    if date is None:
        return jsonify({'message': 'Bad format of date'}), 400

    time = get_time_from_string(data['time'])
    if time is None:
        return jsonify({'message': 'Bad format of time'}), 400

    match_id = query.create_match(data['tournament_id'], date, time, data['challenger'], data['defender'])

    return jsonify({'message': 'Match created', 'data': match_id}), 200
