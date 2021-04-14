import os
from flask import Flask
from models import db

app = Flask(__name__)
app.debug = True
_basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(_basedir, 'app.db')
db.init_app(app)

if __name__ == '__main__':
    app.run()
