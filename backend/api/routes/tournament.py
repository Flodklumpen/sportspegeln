from datetime import date
from flask import Blueprint, request, jsonify
from ..models import query
from . import routes_help

tournament_bp = Blueprint('tournament_bp', __name__)

@tournament_bp.route('/create_tournament', methods=['POST'])
def create_tournament():
    data = request.get_json()
    required_fields = ['owner', 'tournament_name']

    if not routes_help.existing_fields(data, required_fields):
        return jsonify({'message': "Missing required field(s)"}), 400

    if not routes_help.filled_fields(data, required_fields):
        return jsonify({'message': "Required field(s) not filled"}), 400

    # ensure that owner is a user
    if not query.is_user_registered(data['owner']):
        return jsonify({'message': 'Owner is not registered as user'}), 404

    # set start date to today if not given
    if not 'start_date' in data or not data['start_date']:
        start_date = date.today()
    else:
        # expect date on format YYYY-MM-DD
        start_date = routes_help.get_date_from_string(data['start_date'])
        if start_date is None:
            return jsonify({'message': 'Bad format of start date'}), 400

    # set end date to empty string if not given
    if not 'end_date' in data or not data['end_date']:
        end_date = None
    else:
        end_date = routes_help.get_date_from_string(data['end_date'])
        if end_date is None:
            return jsonify({'message': 'Bad format of end date'}), 400

    if end_date and not routes_help.is_date_before(start_date, end_date):
        return jsonify({'message': 'Start date must not be after end date'}), 400

    # check if user is already owner, otherwise create new owner
    if not query.is_owner(data['owner']):
        query.create_owner(data['owner'])

    # create tournament
    tournament_id = query.create_tournament(data['tournament_name'], data['owner'], start_date, end_date)

    return jsonify({'message': 'Tournament created', 'data': tournament_id}), 200

@tournament_bp.route('/add_competitor', methods=['POST'])
def add_competitor():
    data = request.get_json()
    fields = ['competitor', 'tournament_id']

    if not routes_help.existing_fields(data, fields):
        return jsonify({'message': "Missing field(s)"}), 400

    if not routes_help.filled_fields(data, fields):
        return jsonify({'message': "Field(s) not filled"}), 400

    # ensure that competitor is a user
    if not query.is_user_registered(data['competitor']):
        return jsonify({'message': 'Competitor is not registered as user'}), 404

    #ensure that tournament exists
    if not query.is_tournament(data['tournament_id']):
        return jsonify({'message': 'Tournament does not exist'}), 404

    # create competitor of user if they are not already
    if not query.is_competitor(data['competitor']):
        query.create_competitor(data['competitor'])

    if not query.is_competing(data['competitor'], data['tournament_id']):
        query.create_competing(data['competitor'], data['tournament_id'])

    return jsonify({'message': 'Competitor added'}), 200
