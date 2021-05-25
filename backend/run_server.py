from api import create_app, models
from flask_migrate import Migrate
from flask_seeder import FlaskSeeder
from geventwebsocket.handler import WebSocketHandler
from gevent.pywsgi import WSGIServer

app = create_app()
migrate = Migrate(app, models.db)
models.init_app(app)
seeder = FlaskSeeder()
seeder.init_app(app, models.db)
app.debug = True

if __name__ == '__main__':
    http_server = WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
    http_server.serve_forever()
