# Chat WebSocket Flask

Aplicação cliente-servidor para **transmissão de mensagens em Broadcast**.

Desenvolvida como trabalho de faculdade para a disciplina de Redes de Computadores, da [Fundação Hermínio Ometto (FHO)](https://www.fho.edu.br)

## Tecnologias Utilizadas

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101">



## Sumário

1) [Definição de WebSocket](#o-que-é-um-websocket)
    - [Como Funciona um WebSocket?](#como-funciona-um-websocket)
    - [Socket.io: Solução para WebSockets](#socketio-solução-para-websockets)
    - [Quando WebSockets são utilizadas?](#quando-são-utilizados)
2) [Sobre a Aplicação](#sobre-a-aplicação)
    - [Endpoints](#endpoints)
    - [Eventos](#eventos)
3) [Instalação e Execução](#instalação-e-execução-do-programa)
4) [Fontes de Estudo](#bases-de-estudo)

## O que é um Socket/WebSocket?
> **Socket:** tecnologia de comunicação bidirecional, que permite a comunicação entre dois processos diferentes de forma direta, e em tempo real.
- Normalmente, é aplicado em uma arquitetura **cliente-servidor**
- O Cliente e o Servidor precisam **estar sob a mesma API** do Socket

### Como Funciona um WebSocket?

- **Estabelecimento de Conexão**
    - Um websocket começa realizando uma conexão **HTTP normal**, e depois envia uma **solicitação** de conexão de troca para o **protocolo WebSocket** 
- **Bidirecionalidade**
    - Uma vez estabelecida a conexão, tanto o cliente quanto o servidor podem **transmitir informações** entre si **sem a necessidade de uma solicitação explícita**
- **Eventos e Callbacks**
    - A comunicação WebSocket é **baseada em eventos**, em que o cliente e o servidor podem definir **"manipuladores" (handlers)** para evento como a abertura de conexão, recebimento de mensagens ou fechamento de conexões.


### SocketIO: Solução Para WebSockets

- O [Socket.io](https://socket.io/) é uma biblioteca multi-linguagem que facilita a implementação em tempo real entre cliente e servidor

### Quando são utilizados?

- Aplicativos de bate-papos online
- Jogos Online 
- Plataformas Financeiras (atualizações em tempo real de cotações)
- Aplicações em Tempo Real

## Sobre a Aplicação
A aplicação consiste em um website composto por duas páginas HTML (uma para a realização do login, e outro para o chat em si), construída utilizando o micro-framework web de Python, [Flask](https://flask.palletsprojects.com/en/stable/).
O sistema é baseado no modelo cliente-servidor, e utiliza da biblioteca Socket\.io para o estabelecimento de comunicação via WebSocket. O lado do cliente utiliza de **JavaScript** para a definição dos eventos callback, enquanto o lado do servidor utiliza **Python**.

### Endpoints
"Caminhos" definidos pelo framework (como Flask, Django, Spring...) que identificam um recurso de uma API Rest

#### Login
```python
@app.route('/', methods=['GET', 'POST'])
```
Página de Login, onde o cliente insere um nome de usuário que será apresentado para o servidor e para todos os outros usuários conectados ao servidor.
Utiliza dos métodos GET para exibição da página e o método POST para armazenar o nome de usuário e o IP de forma segura.

#### Chat
```python
@app.route('/chat', methods=['GET'])
```
Página do Chat, onde atua o WebSocket e os eventos de callback definidos no lado do cliente e no lado do servidor.


### Eventos
Eventos de Callback que definem a comunicação entre o cliente e o servidor no protocolo WebSocket

#### Lista de Eventos

| Nome do Evento | Emissor  | Receptor  |
| -------------- | ------   | --------  |
| connect        | Cliente  | Servidor  |
| new_host       | Cliente  | Servidor  |
| host_join_room | Servidor | Cliente   |
| new_message    | Cliente  | Servidor  |
| add_chat_message | Servidor | Cliente |

#### Ciclo de Eventos

- **connect:** conexão entre cliente e usuário 
    - O cliente solicita a conexão com o servidor, através de que autoriza as troca de dados.
    - O cliente aguarda a autorização, e emite o evento callback de 'new_host'
- **new_host:** recebe informações do novo host
    - Ao conectar com o servidor, o cliente passa as informações do novo usuário para o servidor
    - O servidor armazena o no log o horário de conexão, o nome do host e o seu IP
    - Ao terminar essa rotina, o servidor emite o evento 'host_join_room'
- **host_join_room:** envia uma de nova conexão pro chat
    - O cliente recebe o chamado do servidor, e insere no chat uma mensagem '\<usuario> entrou na sala!'
    - A mensagem é transmitida por broadcast para todos os clientes conectados
- **new_message:** cliente envia uma mensagem para o servidor, que trata a mensagem
    - Emitida pelo cliente ao realizar o clique no botão 'Enviar'
    - O servidor recebe a nova mensagem, extrai dados importantes (nome do usuário, endereço de ip, mensagem e horário de envio).
    - O servidor emite o evento 'add_chat_message' para os clientes, em broadcast, encaminhando a mensagem e dados importantes sobre quem enviou a mensagem
- **add_chat_message:** adiciona a nova mensagem ao chat
    - O cliente recebe a mensagem e os dados sobre o remetente e a adiciona ao chat
    - O chat é atualizado em tempo real, e o cliente não necessita recarregar a página para receber uma mensagem (propriedade do WebSocket).

## Instalação e Execução do Programa

### 1) Instalação do Python e do Pip

#### Windows

A instalação pode ser realizada a partir [deste link](https://www.python.org/downloads/windows/), na página oficial do Python.

#### Linux

A instalação pode ser realizada via linha de comando, utilizando o gerenciador de pacotes da sua distro

```bash
sudo dnf install python3 pip
```

Na maioria das distros, o Python pode já estar instalado por padrão.

### 2) Instalação das Dependências

Instalação das dependências salvas no arquivo extensions.txt

```bash
pip install -r extensions.txt
```

### 3) Alterar o IP do servidor no programa

Para garantir a conexão do cliente com o servidor de forma adequada, deve-se realizar a mudança do IP no path do servidor no arquivo **client-side.js** 

```javascript
// Linha que define a conexão com o websocket
const socket = io.connect('http://<ip-do-servidor>')
```

Para descobrir o IP do seu servidor, utilize o terminal (bash ou shell, dependendo do seu sistema operacional) e digite o comando:

```bash
ifconfig
```

E utilize o endereço de IPv4 obtido na linha 'inet'

### 4) Executando a Aplicação

#### Linux
```bash
python3 run.py
```

#### Windows
```shell
python.exe run.py
```
#### Executando em Deploy

Como o programa se trata de um projeto de estudos, optamos por utilizar do web-server de desenvolvimento do Flask para demonstrar a funcionalidade do programa.
Em caso de aplicação em produção, recomenda-se o download de uma extensão adicional para web-server de deploy, o **gunicorn**.
Para realizar a instalação, digite no terminal:

```bash
pip install gunicorn
```

e execute a aplicação com o comando:

```bash
gunicorn --bind 0.0.0.0:<porta> wsgi:app
```

## Bases de Estudo

- [Alura: cursos de Python e Flask](https://alura.com.br)
- [RocketSeat: o que são WebSockets?](https://www.rocketseat.com.br/blog/artigos/post/web-socket-o-que-e-e-como-usar)
- [Flask Documentation](https://flask.palletsprojects.com/en/stable/)