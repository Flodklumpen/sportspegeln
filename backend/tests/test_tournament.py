import unittest
from flask import Flask, json
import sys
sys.path.append("..")
from api.models.base import db, User
from api import routes

class MainTest(unittest.TestCase):

    TESTING = True

    app = Flask(__name__)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///:memory"
    db.init_app(app)
    routes.init_app(app)

    def setUp(self):
        with self.app.app_context():
            db.create_all()
            db.session.add(User(email="testperson@example.com", first_name="test", family_name="person"))
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()

class CreateTournamentTest(MainTest):

    def test_missing_fields(self):
        with self.app.test_client() as c:
            response = c.post(
                '/tournament/create',
                data=json.dumps({}),
                content_type='application/json',
            )
            self.assertEqual(response.status_code, 400)

    def test_missing_data(self):
        with self.app.test_client() as c:
            response = c.post(
                '/tournament/create',
                data=json.dumps({"tournament_name":"", "owner": ""}),
                content_type='application/json',
            )
            self.assertEqual(response.status_code, 400)

    def test_not_user(self):
        with self.app.test_client() as c:
            response = c.post(
                '/tournament/create',
                data=json.dumps({"tournament_name":"test not user", "owner": "testy1@example.com"}),
                content_type='application/json',
            )
            self.assertEqual(response.status_code, 404)

    def test_no_dates(self):
        with self.app.test_client() as c:
            response = c.post(
                '/tournament/create',
                data=json.dumps({"tournament_name":"test no dates", "owner": "testperson@example.com"}),
                content_type='application/json',
            )
            self.assertEqual(response.status_code, 200)

    def test_dates(self):
        with self.app.test_client() as c:
            response = c.post(
                '/tournament/create',
                data=json.dumps({
                    "tournament_name":"test dates",
                    "owner": "testperson@example.com",
                    "start_date": "2020-01-01",
                    "end_date": "2020-12-31"
                }),
                content_type='application/json',
            )
            self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
