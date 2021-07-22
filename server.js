const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' },
});

const PORT = 8000;
let players = [];
io.on('connection', (socket) => {
  console.log('user connected', socket.id);
  socket.on('playerAdd', (res) => {
    players.push(res);
    io.emit('players', players);
  });
  socket.on('playerMove', (res) => {
    io.emit('hariu:', res);
    console.log('hariu: ' + JSON.stringify(res));
  });
  socket.on('disconnect', (res) => {
    console.log('disconnected', socket.id);
    players = players.filter((el, index) => {
      return el.uuid != socket.id;
    });
    console.log(players);
  });
});

httpServer.listen(PORT, () => console.log('Listening on port', PORT));
