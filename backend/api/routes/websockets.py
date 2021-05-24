from flask import Blueprint, request
import json

ws_bp = Blueprint('ws_bp', __name__)

sessions = {}

@ws_bp.route('/api')
def api():
    """
    Handles web sockets.
    """
    print("ws api")
    if request.environ.get('wsgi.websocket'):
        ws = request.environ['wsgi.websocket']

        while True:
            try:
                message = ws.receive()
            except:
                print("connection closed")
                return ""
            if message is not None:
                print("message: ", message)
                ws_data = json.loads(message)
                ws_email = ws_data['email']
                sessions[ws_email] = ws
                print(sessions)
                ws.send(json.dumps({"data":"hello world"}))

def close(email):
    if email in sessions:
        del sessions[token]


def print_session():
    print(sessions)
