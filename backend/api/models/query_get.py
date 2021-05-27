""" Functions to get information from the database """

from .base import db, User, Tournament, Competing, Match
from . import query_help
from datetime import date


def get_user_data(user_email):
    """
    Attempts to find the user connected to a given email.

    :param user_email: String
    :returns: a dict on the form {'first_name':String, 'family_name':String} on
    success, else None
    """
    result = db.session.query(User.first_name, User.family_name, User.email).filter_by(email=user_email).first()
    if result is not None:
        user_info = {'first_name': result[0],
                     'family_name': result[1],
                     'email': result[2]}
        return user_info
    else:
        return None


def get_user_id_from_email(user_email):
    """
    Attempts to find the user id connected to a given email.

    :param user_email: String
    :returns: a user id on success, else None
    """
    result = db.session.query(User.id).filter_by(email=user_email).first()
    if result is not None:
        user_id = result[0]
        return user_id
    else:
        return None


def get_tournaments():
    """
    Returns all tournaments in the database.

    :returns: an array of dicts on the form
        {
            'id': int,
            'name': string,
            'start_date': string,
            'end_date': string,
            'owner': string
        }
    """
    result = db.session.query(
        Tournament.id,
        Tournament.name,
        Tournament.start_date,
        Tournament.end_date,
        Tournament.owner
    ).all()

    tournaments = []
    if result is not None:
        tournaments = query_help.create_tournament_response(result)

    return tournaments


def get_owned_tournaments(email):
    """
    Returns all owned tournaments for a given user in the database.

    :param email: String
    :returns: an array of dicts on the form
        {
            'id': int,
            'name': string,
            'start_date': string,
            'end_date': string,
            'owner': string
        }
    """
    result = db.session.query(
        Tournament.id,
        Tournament.name,
        Tournament.start_date,
        Tournament.end_date,
        Tournament.owner
    ).filter_by(owner=email).all()

    tournaments = []
    if result is not None:
        tournaments = query_help.create_tournament_response(result)

    return tournaments


def get_competing_tournaments(user):
    """
    Returns all competing tournaments for a given user in the database.

    :param user: String
    :returns: an array of dicts on the form
        {
            'id': int,
            'name': string,
            'start_date': string,
            'end_date': string,
            'owner': string
        }
    """
    tour_ids = db.session.query(Competing.tournament).filter_by(competitor=user).all()

    tournaments = []
    for tour_id in tour_ids:
        tournament = db.session.query(
            Tournament.id,
            Tournament.name,
            Tournament.start_date,
            Tournament.end_date,
            Tournament.owner
        ).filter_by(id=tour_id[0]).all()
        tournaments.append(tournament)

    result = []
    if tournaments is not None:
        for tournament in tournaments:
            curr_tournament = {
                'id': tournament[0][0],
                'name': tournament[0][1],
                'start_date': query_help.get_string_from_date(tournament[0][2]),
                'end_date': query_help.get_string_from_date(tournament[0][3]),
                'owner': tournament[0][4]
            }
            result.append(curr_tournament)

    return result


def get_leader(tournament_id):
    """
    Get the leader of the given tournament, if any.

    :param tournament_id: Integer
    :return: String
    """
    result = db.session.query(Tournament.leader).filter_by(id=tournament_id).first()
    if result is not None:
        leader = result[0]
        return leader
    else:
        return None


def get_tournament_name_from_id(tour_id):
    """
    Returns the name of a tournament with a given ID
    """
    result = db.session.query(Tournament.name).filter_by(id=tour_id).first()
    return result[0]


def get_future_matches(email):
    """
    Gets the matches of a user with date after today or without a given date.

    :param email: String
    :returns: an array of dicts on the form
        {
            'id': Int,
            'tournament_id': Int,
            'date': String,
            'time': String,
            'challenger_email': String,
            'defender_email': String
        }
    """
    current_date = date.today()
    result = Match.query.filter(
            (Match.challenger==email) | (Match.defender==email)
        ).filter(
            (Match.date_played > current_date) | (Match.date_played == None)
        ).all()
    future_matches = []
    if result is not None:
        for match in result:
            curr_match = {
                'id' : match.id,
                'tournament_id' : match.tournament,
                'date' : query_help.get_string_from_date(match.date_played),
                'time' : query_help.get_string_from_time(match.time_played),
                'challenger_email' : match.challenger,
                'defender_email' : match.defender
            }
            future_matches.append(curr_match)
    return future_matches


def get_past_matches(email):
    """
    Gets the matches of a user with date today or earlier.

    :param email: String
    :returns: an array of dicts on the form
        {
            'id': Int,
            'tournament_id': Int,
            'date': String,
            'time': String,
            'challenger_email': String,
            'defender_email': String,
            'score_defender': Int,
            'score_challenger': Int,
            'reported': Bool
        }
    """
    current_date = date.today()
    result = Match.query.filter(
            (Match.challenger==email) | (Match.defender==email)
        ).filter(
            (Match.date_played <= current_date)
        ).all()
    past_matches = []
    if result is not None:
        for match in result:
            curr_match = {
                'id' : match.id,
                'tournament_id' : match.tournament,
                'date' : query_help.get_string_from_date(match.date_played),
                'time' : query_help.get_string_from_time(match.time_played),
                'challenger_email' : match.challenger,
                'defender_email' : match.defender,
                'score_defender' : match.score_defender,
                'score_challenger' : match.score_challenger,
                'reported' : match.timestamp_reported is not None
            }
            past_matches.append(curr_match)
    return past_matches


def get_competitors(tournament_id, match_id):
    result = db.session.query(Match.defender, Match.challenger).filter_by(
        tournament=tournament_id, id=match_id).first()
    if result is not None:
        competitors = {
            'defender': result.defender,
            'challenger': result.challenger
        }
        return competitors
    return None
