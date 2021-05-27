""" Functions to check if a given object is in the database """

from .base import db, User, Tournament, Owner, Competitor, Competing, Match


def is_user_registered(user_email):
    """
    Returns true if a given email is in the user table.
    """
    return db.session.query(User.email).filter_by(email=user_email).first() is not None


def is_owner(owner_email):
    """
    Returns true if a given email is in the owner table.
    """
    return db.session.query(Owner.email).filter_by(email=owner_email).first() is not None


def is_owner_of_tournament(owner_email, tournament_id):
    """
    Returns true if a given user is the owner of a given tournament.
    """
    return db.session.query(Tournament).filter_by(id=tournament_id, owner=owner_email).first() is not None


def is_tournament(tour_id):
    """
    Returns true if a given id is in the tournament table.
    """
    return db.session.query(Tournament.id).filter_by(id=tour_id).first() is not None


def is_competitor(competitor_email):
    """
    Returns true if a given email is in the competitor table.
    """
    return db.session.query(Competitor.email).filter_by(email=competitor_email).first() is not None


def is_competing(comp_email, tournament_id):
    """
    Returns true if a given email and tournament id is in the competing table.
    """
    return db.session.query(Competing).filter_by(competitor=comp_email, tournament=tournament_id).first() is not None


def is_match(tournament_id, match_id):
    """Returns true if a given id is in the tournament table
    """
    return db.session.query(Match).filter_by(id=match_id, tournament=tournament_id).first() is not None
