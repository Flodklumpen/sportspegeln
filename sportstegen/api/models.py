from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# see https://stackoverflow.com/questions/9692962/flask-sqlalchemy-import-context-issue/9695045#9695045


class User(db.Model):
    # TODO: Implement this.
    pass

# see different relationships here: https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/
