const express = require('express');
const webSocket = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
const server = require('http').Server(app);
console.log(server);
const io = webSocket(server);

//   , {
//   cors: {
//     origin: '*',
//   }
// });


const port = process.env.PORT || 5000;
// console.log(process.env);

app.use(express.static('build'));

app.get('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ a: 5 });
});

io.on('connection', (socket) => {
  console.log('user connected', socket.id);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
