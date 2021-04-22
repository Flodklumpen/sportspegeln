from run_server import *
from api.models.base import db

"""
Use this file if the database has been deleted.
"""
with app.app_context():
    db.create_all()
