from flask import Flask
from app.views import views
from app.events import socket

def create_app() -> Flask:
    app = Flask(__name__)
    app.secret_key = 'AulaRedes123@'
    app.register_blueprint(views)   
    socket.init_app(app)
    return app