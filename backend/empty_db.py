from run_server import *
from api.models.base import db, User, Owner, Competitor, Tournament, Match, Competing

with app.app_context():

    matches = db.session.query(Match).all()

    for match in matches:
        db.session.delete(match)

    db.session.commit()

    competings = db.session.query(Competing).all()

    for competing in competings:
        db.session.delete(competing)

    db.session.commit()

    tournaments = db.session.query(Tournament).all()

    for tournament in tournaments:
        db.session.delete(tournament)

    db.session.commit()

    competitors = db.session.query(Competitor).all()

    for competitor in competitors:
        db.session.delete(competitor)

    db.session.commit()

    owners = db.session.query(Owner).all()

    for owner in owners:
        db.session.delete(owner)

    db.session.commit()

    users = db.session.query(User).all()

    for user in users:
        db.session.delete(user)

    db.session.commit()
