from flask_seeder import Seeder, Faker, generator
from api.models.base import User, Owner


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
                "family_name": generator.String("[a-w]{5}")
            }
        )

        # Create 5 users
        for user in faker.create(10):
            print("Adding user: %s" % user)
            self.db.session.add(user)
