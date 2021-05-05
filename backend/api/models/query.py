from .base import db, User, Tournament, Owner, Competitor, Competing, Match

"""Functions to create objects in the database"""


def register_user(user_email, user_fname, user_lname):
    db.session.add(User(email=user_email, first_name=user_fname, family_name=user_lname))
    db.session.commit()


def create_owner(owner_email):
    db.session.add(Owner(email=owner_email));
    db.session.commit()


def create_tournament(tour_name, tour_owner, tour_start, tour_end):
    tournament = Tournament(name=tour_name, owner=tour_owner, start_date=tour_start, end_date=tour_end)
    db.session.add(tournament)
    db.session.commit()
    return tournament.id


def create_competitor(competitor_email):
    db.session.add(Competitor(email=competitor_email));
    db.session.commit()


def create_competing(competitor_email, tournament_id):
    db.session.add(Competing(competitor=competitor_email, tournament=tournament_id));
    db.session.commit()


def create_match(match_id, tournament_id, date, time, challenger_email, defender_email):
    match = Match(
        id=match_id,
        tournament=tournament_id,
        date_played=date,
        time_played=time,
        challenger=challenger_email,
        defender=defender_email
    )
    db.session.add(match)
    db.session.commit()


""" Functions to check if a given object is in the database """


def is_user_registered(user_email):
    return (db.session.query(User.email).filter_by(email=user_email).first() is not None)


def is_owner(owner_email):
    return (db.session.query(Owner.email).filter_by(email=owner_email).first() is not None)


def is_tournament(tour_id):
    return (db.session.query(Tournament.id).filter_by(id=tour_id).first() is not None)


def is_competitor(competitor_email):
    return (db.session.query(Competitor.email).filter_by(email=competitor_email).first() is not None)


def is_competing(comp_email, tournament_id):
    return (db.session.query(Competing).filter_by(competitor=comp_email, tournament=tournament_id).first() is not None)


def is_competing(comp_email, tournament_id):
    return (db.session.query(Competing).filter_by(competitor=comp_email, tournament=tournament_id).first() is not None)

"""Functions to get information from the database"""

def get_user_info(user_email):
    result = db.session.query(User.first_name, User.family_name).filter_by(email=user_email).first()
    if result is not None:
        user_info = {}
        user_info['first_name'] = result[0]
        user_info['family_name'] = result[1]
        return user_info
    else:
        return None

""" Miscellanious functions """


def get_next_match_id(tournament_id):
    result = db.session.query(Match.id).filter_by(tournament=tournament_id).all()
    if not result:
        return 1
    else:
        return max(result)[0] + 1
