from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKeyConstraint
from sqlalchemy.orm import relationship

db = SQLAlchemy()
# see https://stackoverflow.com/questions/9692962/flask-sqlalchemy-import-context-issue/9695045#9695045
# see different relationships here: https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/


class User(db.Model):
    __tablename__ = 'user'
    email = db.Column(db.String(120), primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    family_name = db.Column(db.String(50), nullable=False)


class Owner(db.Model):
    __tablename__ = 'owner'
    email = db.Column(db.String(120), db.ForeignKey("user.c.email"), primary_key=True)


class Competitor(db.Model):
    __tablename__ = 'competitor'
    email = db.Column(db.String(120), db.ForeignKey('user.email'), primary_key=True)


class Tournament(db.Model):
    __tablename__ = 'tournament'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime)
    owner_id = db.Column(db.String(120), db.ForeignKey('owner.email'), nullable=False)


competing = db.Table(
    db.Column('comp', db.String(120), db.ForeignKey('competitor.email'), primary_key=True),
    db.Column('tour', db.Integer, db.ForeignKey('tournament.id'), primary_key=True)
)


class Match(db.Model):
    __tablename__ = 'match'
    id = db.Column(db.Integer, primary_key=True)
    tournament = db.Column(db.Integer, db.ForeignKey('tournament.id'), primary_key=True)
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    challenger = db.Column(db.String(120), db.ForeignKey('competitor.email'), nullable=False)
    defender = db.Column(db.String(120), db.ForeignKey('competitor.email'), nullable=False)
    score_challenger = db.Column(db.Integer)
    score_defender = db.Column(db.Integer)
