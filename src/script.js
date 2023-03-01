const socket = new WebSocket('ws://localhost:8001');

socket.addEventListener('open', function (event) {
    console.log('Connected to server');
});

socket.addEventListener('message', function (event) {
    const messages = document.getElementById('messages');
    const message = document.createElement('div');
    const data = JSON.parse(event.data);
    message.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    messages.appendChild(message);
});

function sendMessage(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const username = usernameInput.value;
    const message = messageInput.value;
    usernameInput.value = '';
    messageInput.value = '';
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${username}</strong>: ${message}`;
    messages.appendChild(messageElement);
    const data = { username, message };
    socket.send(JSON.stringify(data));
}