def init_app(app):
    from .login import login_bp
    from .tournament import tournament_bp
    app.register_blueprint(login_bp, url_prefix='/login')
    app.register_blueprint(tournament_bp, url_prefix='/tournament')
