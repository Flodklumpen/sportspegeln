from server import *

"""
Use this file if the database has been deleted. 
"""
with app.app_context():
    db.create_all()
