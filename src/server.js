const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8001 });

wss.on('listening', () => {
  console.log('WebSocket server is running on port 8001');
});

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
        console.log('Received message:', message.toString());
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

wss.on('error', (error) => {
  console.error(`WebSocket server error: ${error}`);
});
