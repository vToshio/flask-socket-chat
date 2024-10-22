from flask_socketio import SocketIO

socket = SocketIO()

@socket.on('connect')
def handle_connect():
    print('Conectado.')