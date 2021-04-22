from api import create_app, models
#from . import models
from flask_migrate import Migrate

app = create_app()
migrate = Migrate(app, models.db)
models.init_app(app)
app.debug = True;

if __name__ == '__main__':
    app.run()
