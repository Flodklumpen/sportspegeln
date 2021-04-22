from api import create_app, models
from flask_migrate import Migrate
from flask_seeder import FlaskSeeder

app = create_app()
migrate = Migrate(app, models.db)
models.init_app(app)
seeder = FlaskSeeder()
seeder.init_app(app, models.db)
app.debug = True;

if __name__ == '__main__':
    app.run()
