from server import *
from models import User

with app.app_context():
    db.create_all()
    testy = User(email='admin@example.com')
    db.session.add(testy)
    db.session.commit()
    print(User.query.all())
