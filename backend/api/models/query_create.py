""" Functions to create objects in the database """

from .base import db, User, Tournament, Owner, Competitor, Competing, Match


def register_user(user_email, user_fname, user_lname, user_id):
    """
    Adds a user to the database.
    """
    db.session.add(User(email=user_email, first_name=user_fname, family_name=user_lname, id=user_id))
    db.session.commit()


def create_owner(owner_email):
    """
    Adds an owner to the database.
    """
    db.session.add(Owner(email=owner_email))
    db.session.commit()


def create_tournament(tour_name, tour_owner, tour_start, tour_end):
    """
    Adds a tournament to the database.
    """
    tournament = Tournament(name=tour_name, owner=tour_owner, start_date=tour_start, end_date=tour_end)
    db.session.add(tournament)
    db.session.commit()
    return tournament.id


def create_competitor(competitor_email):
    """
    Adds a competitor to the database.
    """
    db.session.add(Competitor(email=competitor_email))
    db.session.commit()


def create_competing(competitor_email, tournament_id):
    """
    Adds a competing to the database.
    """
    db.session.add(Competing(competitor=competitor_email, tournament=tournament_id))
    db.session.commit()


def create_rank(tournament_id):
    """
    Creates an initial ranking for the tournament.

    :param tournament_id: Integer
    """
    competitors = db.session.query(Competing.competitor).filter_by(tournament=tournament_id).all()

    if competitors:
        tournament = db.session.query(Tournament).get(tournament_id)
        tournament.leader = competitors[0][0]

        for i in range(0, len(competitors)):
            competing = db.session.query(Competing).get([competitors[i][0], tournament_id])
            if i != 0:
                competing.rank_before = competitors[i - 1][0]
            if i != len(competitors) - 1:
                competing.rank_after = competitors[i + 1][0]
            db.session.commit()


def create_match(match_id, tournament_id, date, time, challenger_email, defender_email):
    """
    Adds a match to the database.
    """
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


def create_challenge(match_id, tournament_id, challenger_email, defender_email):
    """
    Adds a match to the database, with just the required info
    """
    match = Match(
        id=match_id,
        tournament=tournament_id,
        challenger=challenger_email,
        defender=defender_email
    )
    db.session.add(match)
    db.session.commit()
