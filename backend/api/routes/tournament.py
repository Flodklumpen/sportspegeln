from datetime import date, datetime
from flask import Blueprint, request, jsonify
from ..models import query

tournament_bp = Blueprint('tournament_bp', __name__)

def existing_fields(data, fields):
    return all(elem in data for elem in fields)


def filled_fields(data, fields):
    for field in fields:
        if not data[field]:
            return False
    return True

@tournament_bp.route('/create', methods=['POST'])
def create_tournament():
    data = request.get_json()
    # make sure that end_date can be empty
    # can allow start date to be empty? in that case take current date?
    required_fields = ['owner', 'tournament_name']

    if not existing_fields(data, required_fields):
        return jsonify({'message': "Missing required field(s)"}), 400

    if not filled_fields(data, required_fields):
        return jsonify({'message': "Required field(s) not filled"}), 400

    # ensure that owner is a user
    if not query.is_user_registered(data['owner']):
        return jsonify({'message': 'Owner is not registered as user'}), 404

    # set start date to today if not given
    if not 'start_date' in data or not data['start_date']:
        start_date = date.today()
    else:
        # expect date on format YYYY-MM-DD
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')

    # set end date to empty string if not given
    if not 'end_date' in data or not data['end_date']:
        end_date = None
    else:
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')

    # check if user is already owner, otherwise create new owner
    if not query.is_owner(data['owner']):
        query.create_owner(data['owner'])

    # create tournament
    query.create_tournament(data['tournament_name'], data['owner'], start_date, end_date)

    return jsonify({'message': 'Tournament created'}), 200
