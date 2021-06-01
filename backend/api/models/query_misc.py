""" Miscellanious query functions """

from .base import db, User, Tournament, Competing, Match
from .query_get import get_leader
from .query_create import create_rank


def get_next_match_id(tournament_id):
    """
    Calculates the next match id to use in a given tournament.

    :param tournament_id: int
    :returns: Integer
    """
    result = db.session.query(Match.id).filter_by(tournament=tournament_id).all()
    if not result:
        return 1
    else:
        return max(result)[0] + 1


def get_rank(tournament_id):
    """
    Gets the ranking of given tournament.

    :param tournament_id:
    :return: List
    """
    rank = []

    leader = get_leader(tournament_id)

    if not leader:
        create_rank(tournament_id)
        leader = get_leader(tournament_id)

    tournament = db.session.query(Tournament).get(tournament_id)

    current = db.session.query(Competing.competitor, Competing.rank_after).filter_by(
        tournament=tournament.id, competitor=leader).first()

    while current:
        user = db.session.query(User.first_name, User.family_name, User.email).filter_by(
            email=current.competitor).first()
        current_name = user[0] + ' ' + user[1]
        rank.append({'name': current_name,
                     'email': user[2]})
        current = db.session.query(Competing.competitor, Competing.rank_after).filter_by(
            competitor=current.rank_after, tournament=tournament.id).first()

    return rank


def add_competitor_to_rank(competitor_id, tournament_id):
    """
    Adds a given competitor to the end of a given tournament's rank.

    :param competitor_id: String
    :param tournament_id: Int
    """
    if get_leader(tournament_id):
        rank = get_rank(tournament_id)

        competitor_last = rank[-1]['email']
        competing_last = db.session.query(Competing).get([competitor_last, tournament_id])
        competing_last.rank_after = competitor_id
        new_competitor = db.session.query(Competing).get([competitor_id, tournament_id])
        new_competitor.rank_before = competitor_last

        db.session.commit()


def is_reported(tournament_id, match_id):
    """
    Checks if a given match is reported, by checking if it contains a timestamp

    :param tournament_id: Int
    :param match_id: Int
    :return: Bool
    """
    match = db.session.query(Match).filter_by(id=match_id, tournament=tournament_id).first()
    return match.timestamp_reported is not None


def can_challenge(challenger_email, defender_email, tournament_id):
    """
    Checks if a given defender is within 3 placements above a challenger.

    :param challenger_email: String
    :param defender_email: String
    :param tournament_id: Int
    :return: Bool
    """
    all_competitors = db.session.query(Competing).filter_by(tournament=tournament_id)
    challenger = all_competitors.filter_by(competitor=challenger_email).first()
    current = challenger.rank_before
    for i in range(3):
        if current == defender_email:
            return True
        current = all_competitors.filter_by(rank_after=current).first().competitor
    return False
