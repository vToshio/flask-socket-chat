// Obter informações de Sessão
var address = document.getElementById('address').textContent;
var user = document.getElementById('user').textContent;

// Objetos manipulados
let enviar = document.getElementById('enviar');
let sair = document.getElementById('sair');
const socket = io.connect('http://10.10.10.199:5000');

function handle_emit_message() {
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
}

// Evento de Conexão Server-side
socket.on('connect', () => {
    // Evento server-side que registra os dados de um novo visitante
    socket.emit('new_host', user, address); 
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

// Evento client-side que informará a saída de um usuário ao clicar no botão de sair
sair.addEventListener('click', () => {
    socket.emit('host_logout', user, address)
});

// Evento client-side que adicionará uma nova mensagem no chat
socket.on('add_chat_message', (dados) => {
    let chat = document.getElementById('chat');
    let nova_msg = document.createElement('p');
    
    nova_msg.textContent = `[${dados['time']}] ${dados['username']}: ${dados['mensagem']}`
    chat.appendChild(nova_msg)
});

// Evento client-side que informará a entrada de um novo usuário
socket.on('chat_warning', (aviso) => {
    let chat = document.getElementById('chat');
    let new_aviso = document.createElement('p');

    new_aviso.style.fontWeight = 'bold';
    new_aviso.style.textAlign = 'center';
    new_aviso.textContent = aviso

    chat.appendChild(new_aviso);
});