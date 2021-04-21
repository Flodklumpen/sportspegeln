from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
# see https://stackoverflow.com/questions/9692962/flask-sqlalchemy-import-context-issue/9695045#9695045
# see different relationships here: https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/


class User(db.Model):
    email = db.Column(db.String(120), primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    family_name = db.Column(db.String(50), nullable=False)

    def __str__(self):
        return "email=%s, first_name=%s, family_name=%s" % (self.email, self.first_name, self.family_name)


class Owner(db.Model):
    email = db.Column(db.String(120), db.ForeignKey("user.email"), primary_key=True)


class Competing(db.Model):
    competitor = db.Column(db.String(120), db.ForeignKey('competitor.email'), primary_key=True)
    tournament = db.Column(db.Integer, db.ForeignKey('tournament.id'), primary_key=True)


class Competitor(db.Model):
    email = db.Column(db.String(120), db.ForeignKey('user.email'), primary_key=True)


class Tournament(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime)
    owner = db.Column(db.String(120), db.ForeignKey('owner.email'), nullable=False)


class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tournament = db.Column(db.Integer, db.ForeignKey('tournament.id'), primary_key=True)
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    challenger = db.Column(db.String(120), db.ForeignKey('competitor.email'), nullable=False)
    defender = db.Column(db.String(120), db.ForeignKey('competitor.email'), nullable=False)
    score_challenger = db.Column(db.Integer)
    score_defender = db.Column(db.Integer)


User.owner = db.relationship("Owner", back_populates="user", uselist=False)
User.competitor = db.relationship("Competitor", back_populates="user", uselist=False)
Owner.user = db.relationship("User", uselist=False)
Competitor.user = db.relationship("User", uselist=False)

"""
Don't work but for future reference:
Owner.tournaments = db.relationship("Tournament", order_by=Tournament.owner, back_populates="owner")
Tournament.owner = db.relationship("Owner", order_by=Owner.email, back_populates="tournaments")
Competitor.tournaments = db.relationship('Tournament', secondary=tournaments, lazy='subquery', backref=db.backref('competitors', lazy=True))
"""
