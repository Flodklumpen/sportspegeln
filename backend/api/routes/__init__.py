def init_app(app):
    from .user import user_bp
    from .tournament import tournament_bp
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(tournament_bp, url_prefix='/tournament')
