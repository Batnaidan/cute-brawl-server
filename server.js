const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' },
});

const PORT = 8000;
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('message', (res) => {
    let json = io.emit('hariu: ', res);
    console.log('hariu: ' + JSON.stringify(res));
  });
});

httpServer.listen(PORT, () => console.log('Listening on port', PORT));
