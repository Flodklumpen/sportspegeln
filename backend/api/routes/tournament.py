from datetime import date, datetime
from flask import Blueprint, request, jsonify
from ..models import query
from . import routes_help
from .auth import *

tournament_bp = Blueprint('tournament_bp', __name__)


@tournament_bp.route('/create_tournament', methods=['POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def create_tournament():
    """
    Creates a tournament.
    """
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
    if 'start_date' not in data or not data['start_date']:
        start_date = date.today()
    else:
        # expect date on format YYYY-MM-DD
        start_date = routes_help.get_date_from_string(data['start_date'])
        if start_date is None:
            return jsonify({'message': 'Bad format of start date'}), 400

    # set end date to empty string if not given
    if 'end_date' not in data or not data['end_date']:
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

    # create tournaments
    tournament_id = query.create_tournament(data['tournament_name'], data['owner'], start_date, end_date)

    return jsonify({'message': 'CreateTournament created', 'data': tournament_id}), 200


@tournament_bp.route('/add_competitor', methods=['POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def add_competitor():
    """
    Adds a competitor to a tournament.
    """
    data = request.get_json()
    fields = ['competitor', 'tournament_id']

    if not routes_help.existing_fields(data, fields):
        return jsonify({'message': "Missing field(s)"}), 400

    if not routes_help.filled_fields(data, fields):
        return jsonify({'message': "Field(s) not filled"}), 400

    # ensure that competitor is a user
    if not query.is_user_registered(data['competitor']):
        return jsonify({'message': 'Competitor is not registered as user'}), 404

    # ensure that tournaments exists
    if not query.is_tournament(data['tournament_id']):
        return jsonify({'message': 'CreateTournament does not exist'}), 404

    # create competitor of user if they are not already
    if not query.is_competitor(data['competitor']):
        query.create_competitor(data['competitor'])

    if not query.is_competing(data['competitor'], data['tournament_id']):
        query.create_competing(data['competitor'], data['tournament_id'])

    query.add_competitor_to_rank(data['competitor'], data['tournament_id'])

    return jsonify({'message': 'Competitor added'}), 200


@tournament_bp.route('/create_challenge', methods=['POST'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def create_challenge():
    """Creates a match between two competitors
    """
    data = request.get_json()
    required_fields = ['tournament_id', 'challenger', 'defender']

    if not routes_help.existing_fields(data, required_fields):
        return jsonify({'message': "Missing required field(s)"}), 400

    if not routes_help.filled_fields(data, required_fields):
        return jsonify({'message': "Required field(s) not filled"}), 400

    # check so that both challenger and defender are registered in the tournaments
    # this also ensures that they are both users
    if not (query.is_competing(data['challenger'], data['tournament_id']) and query.is_competing(data['defender'], data['tournament_id'])):
        return jsonify({'message': 'Challenger and/or defender are not registered in this tournaments'}), 404

    # check that tournaments exists
    if not query.is_tournament(data['tournament_id']):
        return jsonify({'message': 'CreateTournament does not exist'}), 404

    id = query.get_next_match_id(data['tournament_id'])

    query.create_challenge(id, data['tournament_id'], data['challenger'], data['defender'])

    return jsonify({'message': 'Match created', 'data': id}), 200


@tournament_bp.route('/edit_match', methods=['PUT'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def edit_match():
    """Updates a match with the given information
    """
    data = request.get_json()
    #TODO: Maybe we don't need challenger and defender, see if it is easy not to send from frontend
    required_fields = ['tournament_id', 'match_id']

    if not routes_help.existing_fields(data, required_fields):
        return jsonify({'message': "Missing required field(s)"}), 400

    if not routes_help.filled_fields(data, required_fields):
        return jsonify({'message': "Required field(s) not filled"}), 400

    # check that tournaments exists
    if not query.is_match(data['tournament_id'], data['match_id']):
        return jsonify({'message': 'Match does not exist'}), 404

    if not 'date' in data or not data['date']:
        date = None
    else:
        date = routes_help.get_date_from_string(data['date'])
        if date is None:
            return jsonify({'message': 'Bad format of date'}), 400

    if not 'time' in data or not data['time']:
        time = None
    else:
        time = routes_help.get_time_from_string(data['time'])
        if time is None:
            return jsonify({'message': 'Bad format of time'}), 400

    query.edit_match(data['match_id'], data['tournament_id'], date, time)

    return jsonify({'message': 'Match updated'}), 200


@tournament_bp.route('/report_match', methods=['PUT'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def report_match():
    """Reports the result of a match. All data needs to be included
    """
    data = request.get_json()
    #TODO: Maybe we don't need challenger and defender, see if it is easy not to send from frontend
    required_fields = [
        'tournament_id',
        'match_id',
        'date',
        'time',
        'score_defender',
        'score_challenger'
    ]

    if not routes_help.existing_fields(data, required_fields):
        return jsonify({'message': "Missing required field(s)"}), 400

    if not routes_help.filled_fields(data, required_fields):
        return jsonify({'message': "Required field(s) not filled"}), 400

    # check that tournaments exists
    if not query.is_match(data['tournament_id'], data['match_id']):
        return jsonify({'message': 'Match does not exist'}), 404

    date = routes_help.get_date_from_string(data['date'])
    if date is None:
        return jsonify({'message': 'Bad format of date'}), 400

    time = routes_help.get_time_from_string(data['time'])
    if time is None:
        return jsonify({'message': 'Bad format of time'}), 400

    timestamp = datetime.now()

    query.report_match(data['match_id'], data['tournament_id'], date, time, timestamp, data['score_defender'], data['score_challenger'])

    return jsonify({'message': 'Match reported'}), 200


@tournament_bp.route('/get_future_matches', methods=['GET'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def get_future_matches():
    email = request.args.get('email')

    if not email:
        return jsonify({'message': 'Missing parameter'}), 400

    future_matches = query.get_future_matches(email)

    for match in future_matches:
        challenger_info = query.get_user_info(match['challenger_email'])
        match['challenger'] = challenger_info['first_name'] + ' ' + challenger_info['family_name']
        defender_info = query.get_user_info(match['defender_email'])
        match['defender'] = defender_info['first_name'] + ' ' + defender_info['family_name']
        match['tournament'] = query.get_tournament_name_from_id(match['tournament_id'])

    return jsonify({'message': "Found future matches", "data": future_matches}), 200


@tournament_bp.route('/get_past_matches', methods=['GET'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def get_past_matches():
    email = request.args.get('email')

    if not email:
        return jsonify({'message': 'Missing parameter'}), 400

    future_matches = query.get_past_matches(email)

    for match in future_matches:
        challenger_info = query.get_user_info(match['challenger_email'])
        match['challenger'] = challenger_info['first_name'] + ' ' + challenger_info['family_name']
        defender_info = query.get_user_info(match['defender_email'])
        match['defender'] = defender_info['first_name'] + ' ' + defender_info['family_name']
        match['tournament'] = query.get_tournament_name_from_id(match['tournament_id'])

    return jsonify({'message': "Found past matches", "data": future_matches}), 200


@tournament_bp.route('/get_tournaments', methods=['GET'])
def get_tournaments():
    """
    Returns all tournaments.
    """
    tournaments = query.get_tournaments()
    for tournament in tournaments:
        owner_info = query.get_user_info(tournament['owner'])
        # assume it will work, should not be able to be None
        tournament['owner_name'] = owner_info['first_name'] + ' ' + owner_info['family_name']
    return jsonify({'message': 'got tournaments', 'data': tournaments}), 200


@tournament_bp.route('/get_rank', methods=['GET'])
def get_rank():
    """
    Returns the ranking of given tournament.
    """
    tournament = request.args.get('tournament')

    if not tournament:
        return jsonify({'message': 'Missing parameter'}), 400

    if not query.is_tournament(tournament):
        return jsonify({'message': 'Tournament does not exist'}), 404

    rank = query.get_rank(tournament)

    if rank is None:
        return jsonify({'message': 'Rank not found'}), 404

    return jsonify({'message': "Rank found", "data": rank}), 200
