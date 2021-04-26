from run_server import *
from api.models.base import db, User, Owner, Competitor, Tournament, Match, Competing

with app.app_context():
    users = db.session.query(User).all()

    for user in users:
        db.session.delete(user)

    db.session.commit()
