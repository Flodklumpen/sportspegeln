import os
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from models import db, User
from sqlalchemy.engine import Engine
from sqlalchemy import event
from flask_seeder import FlaskSeeder

@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


app = Flask(__name__)
app.debug = True

# set to false because it adds significant overhead
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

_basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(_basedir, 'app.db')

migrate = Migrate(app, db)

db.init_app(app)

seeder = FlaskSeeder()
seeder.init_app(app, db)


if __name__ == '__main__':
    app.run()
