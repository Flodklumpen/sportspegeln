from .base import db, User, Tournament, Owner, Competitor, Competing, Match
from . import query_help
from datetime import date


""" Functions to create objects in the database """


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


""" Functions to check if a given object is in the database """


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


""" Functions to get information from the database """


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


"""Functions to edit information in the database"""


def edit_match(match_id, tour_id, date, time):
    """
    Updates a match with given info. Expects less info than report_match.

    :param match_id: Int
    :param tour_id: Int
    :param date: DateTime object or None
    :param time: DateTime object or None
    """
    result = Match.query.filter_by(id=match_id, tournament=tour_id).first()
    result.date_played = date
    result.time_played = time
    db.session.commit()


def report_match(match_id, tour_id, date, time, timestamp, score_defender, score_challenger):
    """
    Updates a match with given info. Expects more info than edit_match.

    :param match_id: Int
    :param tour_id: Int
    :param date: DateTime object
    :param time: DateTime object
    :param timestamp: DateTime object
    :param score_defender: Int
    :param score_challenger: Int
    """
    result = Match.query.filter_by(id=match_id, tournament=tour_id).first()
    result.date_played = date
    result.time_played = time
    result.timestamp_reported = timestamp
    result.score_defender = score_defender
    result.score_challenger = score_challenger
    db.session.commit()


def update_rank(winner, loser, tournament_id):
    """
    Updates the rank so that the winner is above the loser.
    """
    leader = get_leader(tournament_id)
    if not leader:
        return

    tournament = Tournament.query.filter_by(id=tournament_id).first()

    current_email = tournament.leader

    if leader == loser:
        # we have a new leader
        tournament.leader = winner

    found_loser = False
    both_found = False
    winner_before = None
    winner_after = None
    loser_before = None

    all_competing = Competing.query.filter_by(tournament=tournament_id)

    while current_email:
        current_competitor = all_competing.filter_by(competitor=current_email).first()
        if current_email == winner:
            if not found_loser:
                # found winner before loser --> don't change order
                return
            else:
                winner_before = current_competitor.rank_before
                winner_after = current_competitor.rank_after
                both_found = True
                break
        if current_email == loser:
            loser_before = current_competitor.rank_before
            found_loser = True
        current_email = current_competitor.rank_after

    if both_found:
        if winner_before:
            person_before_winner = all_competing.filter_by(competitor=winner_before).first()
            person_before_winner.rank_after = winner_after

        if winner_after:
            person_after_winner = all_competing.filter_by(competitor=winner_after).first()
            person_after_winner.rank_before = winner_before

        if loser_before:
            person_before_loser = all_competing.filter_by(competitor=loser_before).first()
            person_before_loser.rank_after = winner

        person_winner = all_competing.filter_by(competitor=winner).first()
        person_winner.rank_before = loser_before
        person_winner.rank_after = loser

        person_loser = all_competing.filter_by(competitor=loser).first()
        person_loser.rank_before = winner

        db.session.commit()


def edit_tournament(tournament_id, start_date, end_date):
    """
    Updates a tournament with given info.

    :param tour_id: Int
    :param start_date: DateTime object
    :param end_time: DateTime object or None
    """
    tournament = Tournament.query.filter_by(id=tournament_id).first()
    tournament.start_date = start_date
    tournament.end_date = end_date
    db.session.commit()


""" Miscellanious functions """


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
        rank.append([current_name, user[2]])
        current = db.session.query(Competing.competitor, Competing.rank_after).filter_by(
            competitor=current.rank_after, tournament=tournament.id).first()

    return rank


def add_competitor_to_rank(competitor_id, tournament_id):
    if get_leader(tournament_id):
        rank = get_rank(tournament_id)

        competitor_last = rank[-1][1]
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
