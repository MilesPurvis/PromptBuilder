const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer);

  server.use(bodyParser.text());

  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  server.post('/send-text', (req, res) => {
    const body = req.body;
    console.log('Received text:', body);
    io.emit('new text', body);
    res.end('Received text');
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = 3001;
  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});