#from api.models import db
from flask_migrate import Migrate
from flask import Flask
from . import models
#rom api.models import db, init_app
import os

app = Flask(__name__)

# set to false because it adds significant overhead
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
_basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(_basedir, 'app.db')
migrate = Migrate(app, models.db)

models.db.init_app(app)

#models.init_app(app)

if __name__=="__main__":
    app.run()
