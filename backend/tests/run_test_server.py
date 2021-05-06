import sys
sys.path.append("..")
from api.models import db
from api import routes
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///:memory"
routes.init_app(app)
db.init_app(app)
with app.app_context():
    db.create_all()

app.debug=True

if __name__ == '__main__':
    app.run()
