from flask import Flask
import os


def create_app():
    from . import models, routes
    app = Flask(__name__)

    # set to false because it adds significant overhead
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    _basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(_basedir, 'app.db')

    routes.init_app(app)
    return app
