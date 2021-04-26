from .base import db, User

def is_user_registered(user_email):
    return (db.session.query(User.email).filter_by(email=user_email).first() is not None)

def register_user(user_email, user_fname, user_lname):
    db.session.add(User(email=user_email, first_name=user_fname, family_name=user_lname))
    db.session.commit()
