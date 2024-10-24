// Obter informações de Sessão
var address = document.getElementById('address').textContent;
var user = document.getElementById('user').textContent;

// Objetos manipulados
let enviar = document.getElementById('enviar');
const socket = io.connect('http://10.10.10.199:5000');

// Evento de Conexão Server-side
socket.on('connect', () => {
    // Evento server-side que registra os dados de um novo visitante
    socket.emit('new_host', address, user); 
});

// Evento acionado ao clicar em Enviar
enviar.addEventListener('click', () => {
    let msg = document.getElementById('mensagem');
    
    /* 
    Envio da mensagem para o servidor, que acionará o evento
    client-side de adicionar uma nova mensagem ao chat
    */  
    if (msg.value != '') {
        socket.emit('new_message', user, address, msg.value)
        msg.value = ''; // Esvaziar o input
    } else {
        msg.placeholder = 'O campo de mensagem não pode estar vazio.';
    }
});

// Evento client-side que adicionará uma nova mensagem no chat
socket.on('add_chat_message', (dados) => {
    let chat = document.getElementById('chat');
    let nova_msg = document.createElement('p');
    
    nova_msg.textContent = `[${dados['time']}] ${dados['username']}: ${dados['mensagem']}`
    chat.appendChild(nova_msg)
});

// Evento client-side que informará a entrada de um novo usuário
socket.on('host_join_room', (aviso) => {
    let chat = document.getElementById('chat');
    let new_aviso = document.createElement('p');

    new_aviso.style.fontWeight = 'bold';
    new_aviso.style.textAlign = 'center';
    new_aviso.textContent = aviso

    chat.appendChild(new_aviso);
});