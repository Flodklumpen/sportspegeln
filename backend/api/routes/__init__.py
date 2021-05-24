def init_app(app):
    from .auth import handle_auth_error, AuthError
    from .user import user_bp
    from .tournament import tournament_bp
    from .websockets import ws_bp
    app.register_error_handler(AuthError, handle_auth_error)
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(tournament_bp, url_prefix='/tournament')
    app.register_blueprint(ws_bp, url_prefix='/ws')
