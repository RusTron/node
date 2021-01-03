const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors: { origin: '*'} });
const users = require('./dataForServer/users');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.static('build'));

app.get('/api/messages', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'http://localhost:3000');
  res.json(users);
});

app.post('/api/messages', bodyParser.json(), (req, res) => {
  const userId = req.body.id;
  const userMessages = users.users[userId].messages;
  const message = {
    userId,
    message: {
      sent: req.body.query,
      id: '_' + Math.random().toString(36).substr(2, 9),
      time: Date.now(),
      read: 'unread',
    }};
  userMessages[userMessages.length] = message;
  res.json(message);
});

io.on('connection', (socket) => {
  socket.on('Open dialog', (userId) => {
    socket.join(userId);
    io.emit('Receive message', { 
      userId,
      message: {
        received: 'hi',
        id: '_' + Math.random().toString(36).substr(2, 9),
        time: Date.now(),
        read: 'unread',
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
