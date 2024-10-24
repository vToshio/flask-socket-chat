from app import create_app, socket

app = create_app()

if __name__ == '__main__':
    socket.run(app, debug=True, host='10.10.10.199', port=5000)