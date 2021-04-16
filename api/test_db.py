from server import *
from models import User, Owner, Tournament, Competitor, competing

from sqlalchemy.inspection import inspect

# for development purposes because of pycharm...
from sqlalchemy.orm import Query

import datetime
from sqlalchemy.inspection import inspect

with app.app_context():
    query = Query
    db.create_all()
    db.session.add(User(email='testyss@example.com', first_name='testy', family_name='testo'))
    db.session.add(Owner(email='testy@example.com'))
    db.session.add(Competitor(email='testyss@example.com'))
    db.session.add(Tournament(name='testyss tournament', start_date=datetime.datetime.now(), owner_id='testyss@example.com'))
    # db.session.add(competing(tournament='testyss tournament', competitor='testyss@example.com'))
    db.session.commit()
    model = Owner
    columns = [m.key for m in model.__table__.columns]
    print(columns)
    # print(model.__table__.columns)
    # print(db.session.query(User).all())
    # print('user: ', User.query.all())
    # print('user: ', db.session.query(User.email).all())
    # print('owner: ', db.session.query(Owner.email).all())

    foreign_keys_set = Owner.__table__.c.email.foreign_keys
    print('FK owner: ', foreign_keys_set)
    foreign_keys_set_tour = Tournament.__table__.c.owner_id.foreign_keys
    print('FK tour: ', foreign_keys_set_tour)

    print('Users:')
    users = User.query.all()
    for user in users:
        print(user.email, ' ', user.first_name, ' ', user.family_name)

    print('Owners:')
    owners = Owner.query.all()
    for owner in owners:
        print(owner.email)

    print('Tour:')
    tours = Tournament.query.all()
    for tour in tours:
        print(tour.name, tour.owner_id)

    print('Competitors:')
    comps = Competitor.query.all()
    for comp in comps:
        print(comp.email)

"""
    print('competing: ')
    comps = competing.query.all()
    for comp in comps:
        print(comp.competitor, comp.tournament)

    owner = Owner.query.first()
    print('test1: ', owner.tournaments)
    for tour in owner.tournaments:
        print(tour.name, tour.owner_id)

    tour = Tournament.query.first()
    print('test2: ', tour.owner_id)
"""
    # db.session.delete(owner)
    # db.session.Competitor.competitor.drop()
    # db.session.flush()
    # db.session.commit()
