from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# see https://stackoverflow.com/questions/9692962/flask-sqlalchemy-import-context-issue/9695045#9695045
# see different relationships here: https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/


class User(db.Model):
    email = db.Column(db.String(120), primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    family_name = db.Column(db.String(50), nullable=False)


class Owner(db.Model):
    email = db.Column(db.String(120), db.ForeignKey(User.email), primary_key=True)


class Competitor(db.Model):
    email = db.Column(db.String(120), db.ForeignKey(User.email), primary_key=True)


class Tournament(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime)
    owner = db.Column(db.String(120), db.ForeignKey(Owner.email), nullable=False)


class Competing(db.Model):
    tournament = db.Column(db.Integer, db.ForeignKey(Tournament.id), primary_key=True)
    competitor = db.Column(db.String(120), db.ForeignKey(Competitor.email), primary_key=True)


class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tournament = db.Column(db.Integer, db.ForeignKey(Tournament.id), primary_key=True)
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    challenger = db.Column(db.String(120), db.ForeignKey(Competitor.email), nullable=False)
    defender = db.Column(db.String(120), db.ForeignKey(Competitor.email), nullable=False)
    score_challenger = db.Column(db.Integer)
    score_defender = db.Column(db.Integer)
