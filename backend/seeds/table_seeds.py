from flask_seeder import Seeder, Faker, generator
from api.models.base import User, Owner, Tournament, Competitor, Competing
from datetime import date


# All seeders inherit from Seeder
class UserSeeder(Seeder):
    def __init__(self, db=None):
        super().__init__(db=db)
        self.priority = 1

    # run() will be called by Flask-Seeder
    def run(self):

        # Create a new Faker and tell it how to create User objects
        faker = Faker(
            cls=User,
            init={
                "email": generator.Email(),
                "first_name": generator.String("[a-w]{5}"),
                "family_name": generator.String("[a-w]{5}"),
                "id": generator.String("[a-w]{8}")
            }
        )

        # Create 3 users
        users = []
        for user in faker.create(3):
            users.append(user.email)
            print("Adding user: %s" % user)
            self.db.session.add(user)

        faker2 = Faker(
            cls=Owner,
            init={
                "email": users[0]
            }
        )

        owners = []
        for owner in faker2.create(1):
            owners.append(owner.email)
            print("Adding owner: %s" % owner)
            self.db.session.add(owner)

        faker3 = Faker(
            cls=Tournament,
            init={
                "id": generator.Integer(start=1, end=50),
                "name": generator.String("[a-w]{8}"),
                "start_date": date.today(),
                "owner": owners[0]
            }
        )

        tournaments = []
        for tournament in faker3.create(1):
            tournaments.append(tournament.id)
            print("Adding tournament: %s" % tournament)
            self.db.session.add(tournament)

        faker4 = Faker(
            cls=Competitor,
            init={
                "email": users[0]
            }
        )

        competitors = []
        for competitor in faker4.create(1):
            competitors.append(competitor.email)
            print("Adding competitor 1: %s" % competitor)
            self.db.session.add(competitor)

        faker5 = Faker(
            cls=Competitor,
            init={
                "email": users[1]
            }
        )

        for competitor in faker5.create(1):
            competitors.append(competitor.email)
            print("Adding competitor 2: %s" % competitor)
            self.db.session.add(competitor)

        faker6 = Faker(
            cls=Competitor,
            init={
                "email": users[2]
            }
        )

        for competitor in faker6.create(1):
            competitors.append(competitor.email)
            print("Adding competitor 3: %s" % competitor)
            self.db.session.add(competitor)

        faker7 = Faker(
            cls=Competing,
            init={
                "competitor": competitors[0],
                "tournament": tournaments[0]
            }
        )

        for competing in faker7.create(1):
            print("Adding competing 1: %s" % competing)
            self.db.session.add(competing)

        faker8 = Faker(
            cls=Competing,
            init={
                "competitor": competitors[1],
                "tournament": tournaments[0]
            }
        )

        for competing in faker8.create(1):
            print("Adding competing 2: %s" % competing)
            self.db.session.add(competing)

        faker8 = Faker(
            cls=Competing,
            init={
                "competitor": competitors[2],
                "tournament": tournaments[0]
            }
        )

        for competing in faker8.create(1):
            print("Adding competing 3: %s" % competing)
            self.db.session.add(competing)
