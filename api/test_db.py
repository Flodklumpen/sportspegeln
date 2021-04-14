from server import *
from models import User


with app.app_context():
    db.create_all()
    testy = User(email='testy@example.com', first_name='testy', family_name='testo')
    db.session.add(testy)
    db.session.commit()
    model = User
    columns = [m.key for m in model.__table__.columns]
    print(columns)
    print(model.__table__.columns)
    print(db.session.query(User).all())
    print(User.query.all())
