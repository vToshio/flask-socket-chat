from flask_socketio import SocketIO, emit
from datetime import datetime

socket = SocketIO(cors_allowed_origins='*')

@socket.on('new_host')
def handle_new_host(ip: str, username: str):    
    conexao = f'[{datetime.now().strftime('%d/%m/%Y %H:%M:%S')}] {username} ({ip}) conectou-se com o servidor!'
    print(conexao)

    # Adicionando todos os visitantes em um log de texto
    with open('visitas.txt', 'a') as file:
        file.write(f'{conexao}\n')
    file.close()

    # Enviando evento para os clientes, avisando da entrada de um novo usuário
    emit('host_join_room', f'{username} entrou na sala!', broadcast=True)

@socket.on('new_message')
def handle_new_message(username: str, ip: str, msg: str):
    msg_time = datetime.now().strftime('%H:%M')
    registro = f'[{datetime.now().strftime('%d/%m/%Y %H:%M:%S')}] {username} ({ip}) enviou: {msg}'
    print(registro)

    # Adição do registro de envio de mensagem pra um arquivo
    with open('chatlog.txt', 'a') as chatlog:
        chatlog.write(f'{registro}\n')
    chatlog.close()

    # Definição dos dados que serão enviados ao cliente
    dados = {
        'username': username,
        'mensagem': msg,
        'time': msg_time
    }
    # Emissão de um evento, que será tratado no client-side
    emit('add_chat_message', dados, broadcast=True)
