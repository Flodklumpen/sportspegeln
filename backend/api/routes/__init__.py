def init_app(app):
    from .login import login_bp
    app.register_blueprint(login_bp, url_prefix='/login')
