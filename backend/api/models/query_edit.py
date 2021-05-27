"""Functions to edit information in the database"""

from .base import db, Tournament, Competing, Match
from .query_get import get_leader


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
