from flask_socketio import SocketIO, emit

socket = SocketIO(cors_allowed_origins='*')

@socket.on('new_host')
def handle_new_host(ip: str, username: str):
    print(f'Novo cliente conectou-se com o servidor!')
    print(f'{username} - {ip}')
    
    # Adicionando todos os visitantes em um arquivo de texto
    with open('visitas.txt', 'w') as file:
        file.write(f'{username} - {ip}')
    file.close()

@socket.on('nova_mensagem')
def handle_new_message(username: str, ip: str, msg: str):
    registro = f'{username} ({ip}) enviou: {msg}'
    print(registro)

    # Adição do registro de envio de mensagem pra um arquivo
    with open('chatlog.txt', 'w') as chatlog:
        chatlog.write(registro)
    chatlog.close()

    # Definição dos dados que serão enviados ao cliente
    dados = {
        'username': username,
        'mensagem': msg
    }
    # Emissão de um evento, que será tratado no client-side
    emit('add_chat_message', dados, broadcast=True)
