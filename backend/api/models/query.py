from .base import db, User, Tournament, Owner

def is_user_registered(user_email):
    return (db.session.query(User.email).filter_by(email=user_email).first() is not None)

def register_user(user_email, user_fname, user_lname):
    db.session.add(User(email=user_email, first_name=user_fname, family_name=user_lname))
    db.session.commit()

def create_owner(owner_email):
    db.session.add(Owner(email=owner_email));
    db.session.commit()

def is_owner(owner_email):
    return (db.session.query(Owner.email).filter_by(email=owner_email).first() is not None)

def create_tournament(tour_name, tour_owner, tour_start, tour_end):
    db.session.add(Tournament(name=tour_name, owner=tour_owner, start_date=tour_start, end_date=tour_end))
    db.session.commit()
