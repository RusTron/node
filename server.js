const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors: { origin: '*'} });
const users = require('./dataForServer/users');
const addMessage = require('./dataForServer/addMessage');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.static('build'));

app.get('/api/messages', (req, res) => {
  res.set('Access-Control-Allow-Headers', 'http://localhost:3000');
  users.users.sort((user1, user2) => user2.time - user1.time);
  res.json(users);
});

app.post('/api/messages', bodyParser.json(), (req, res) => {
  const userId = req.body.id;
  const message = addMessage.addSentMessage(req.body);
  users.users[userId].messages.push(message.message);
  users.users[userId].time = req.body.time;
  res.json(message);
});

io.on('connection', (socket) => {
  socket.on('Open dialog', (userId) => {
    socket.join(userId);
    const time = Date.now();
    const message = addMessage.addReceivedMessage(userId, time);
    users.users[userId].messages.push(message.message);
    users.users[userId].time = time;
    io.emit('Receive message', message);
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
