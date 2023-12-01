const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const { Message } = require('./models');
const { WEBSOCKET_EVENTS, CLIENT_PORT } = require('./constants');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  transport: ['websocket'],
  cors: {
    origin: `http://localhost:${CLIENT_PORT}`,
  },
});

io.on('connection', (socket) => {
  console.log('user is connected');
  socket.on(WEBSOCKET_EVENTS.NEW_MESSAGE, async (newMessage) => {
    try {
      const savedMessage = await Message.create(newMessage);
      // знайти юзера і додати йому нові повідомлення
      const [message] = await Message.find({ _id: savedMessage._id }).populate({
        path: 'userId',
        select: ['email', 'login'],
      });
      io.emit(WEBSOCKET_EVENTS.NEW_MESSAGE, message);
    } catch (error) {
      socket.emit(WEBSOCKET_EVENTS.ERROR_MESSAGE, error);
    }
  });
  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
});

server.listen(port, () => {
  console.log('server started at port ', port);
});
