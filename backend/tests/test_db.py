from flask import Flask
import unittest
from sqlalchemy import exc
import datetime
import sys
sys.path.append("../api")
from models.base import db, User, Owner, Competitor, Tournament, Match, Competing
import os

# for development purposes because of pycharm...
# from sqlalchemy.orm import Query, query = Query

from sqlalchemy.engine import Engine
from sqlalchemy import event


@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


class MainTest(unittest.TestCase):

    TESTING = True
    app = Flask(__name__)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///:memory"
    db.init_app(app)

    def setUp(self):
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()


class AddDataTest(MainTest):

    def test_user(self):
        with self.app.app_context():
            db.session.add(User(email='testy1@example.com', first_name='testy1', family_name='testo1', id="fakeID"))
            db.session.commit()
            user = db.session.query(User).get('testy1@example.com')
            self.assertIn(user, db.session)

    def test_owner(self):
        with self.app.app_context():
            db.session.add(User(email='testy1@example.com', first_name='testy1', family_name='testo1', id="fakeID"))
            db.session.commit()
            db.session.add(Owner(email='testy1@example.com'))
            db.session.commit()
            owner = db.session.query(Owner).get('testy1@example.com')
            self.assertIn(owner, db.session)

    def test_bad_owner(self):
        with self.app.app_context():
            try:
                db.session.add(Owner(email='testy1@example.com'))
                return db.session.commit()
            except exc.IntegrityError:
                db.session.rollback()
            owner = db.session.query(Owner).get('testy1@example.com')
            self.assertIsNone(owner, db.session)

    def test_competitor(self):
        with self.app.app_context():
            db.session.add(User(email='testy1@example.com', first_name='testy1', family_name='testo1', id="fakeID"))
            db.session.commit()
            db.session.add(Competitor(email='testy1@example.com'))
            db.session.commit()
            competitor = db.session.query(Competitor).get('testy1@example.com')
            self.assertIn(competitor, db.session)

    def test_bad_competitor(self):
        with self.app.app_context():
            try:
                db.session.add(Competitor(email='testy1@example.com'))
                return db.session.commit()
            except exc.IntegrityError:
                db.session.rollback()
            competitor = db.session.query(Competitor).get('testy1@example.com')
            self.assertIsNone(competitor, db.session)

    def test_tournament(self):
        with self.app.app_context():
            db.session.add(User(email='testy1@example.com', first_name='testy1', family_name='testo1', id="fakeID"))
            db.session.commit()
            db.session.add(Owner(email='testy1@example.com'))
            db.session.add(Competitor(email='testy1@example.com'))
            db.session.commit()
            db.session.add(Tournament(name='testy1´s tournament', start_date=datetime.datetime.now(), owner='testy1@example.com'))
            db.session.commit()
            tournament = db.session.query(Tournament).get(1)
            self.assertIn(tournament, db.session)

    def test_bad_tournament(self):
        with self.app.app_context():
            try:
                db.session.add(Tournament(name='testy1´s tournament', start_date=datetime.datetime.now(), owner='testy1@example.com'))
                return db.session.commit()
            except exc.IntegrityError:
                db.session.rollback()
            tournament = db.session.query(Tournament).get(1)
            self.assertIsNone(tournament, db.session)

    def test_competing(self):
        with self.app.app_context():
            db.session.add(User(email='testy1@example.com', first_name='testy1', family_name='testo1', id="fakeID"))
            db.session.commit()
            db.session.add(Owner(email='testy1@example.com'))
            db.session.add(Competitor(email='testy1@example.com'))
            db.session.commit()
            db.session.add(Tournament(name='testy1´s tournament', start_date=datetime.datetime.now(), owner='testy1@example.com'))
            db.session.commit()
            db.session.add(Competing(competitor='testy1@example.com', tournament=1))
            db.session.commit()
            competing = db.session.query(Competing).get(('testy1@example.com', 1))
            self.assertIn(competing, db.session)

    def test_bad_competing(self):
        with self.app.app_context():
            try:
                db.session.add(Competing(competitor='testy1@example.com', tournament=1))
                return db.session.commit()
            except exc.IntegrityError:
                db.session.rollback()
            competing = db.session.query(Competing).get(('testy1@example.com', 1))
            self.assertIsNone(competing, db.session)

    def test_match(self):
        with self.app.app_context():
            db.session.add(User(email='testy1@example.com', first_name='testy1', family_name='testo1', id="fakeID"))
            db.session.add(User(email='testy2@example.com', first_name='testy2', family_name='testo2', id="fakeID"))
            db.session.commit()
            db.session.add(Owner(email='testy1@example.com'))
            db.session.add(Competitor(email='testy1@example.com'))
            db.session.commit()
            db.session.add(Competitor(email='testy2@example.com'))
            db.session.commit()
            db.session.add(Tournament(name='testy1´s tournament', start_date=datetime.datetime.now(), owner='testy1@example.com'))
            db.session.commit()
            db.session.add(Match(id=1, tournament=1, challenger='testy1@example.com', defender='testy2@example.com'))
            db.session.commit()
            match = db.session.query(Match).get((1, 1))
            self.assertIn(match, db.session)

    def test_bad_match(self):
        with self.app.app_context():
            try:
                db.session.add(Match(id=1, tournament=1, challenger='testy1@example.com', defender='testy2@example.com'))
                return db.session.commit()
            except exc.IntegrityError:
                db.session.rollback()
            match = db.session.query(Match).get((1, 1))
            self.assertIsNone(match, db.session)


if __name__ == '__main__':
    unittest.main()
