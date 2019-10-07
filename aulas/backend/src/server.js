const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const path = require ('path');

const socketio = require('socket.io');
const http = require ('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);



mongoose.connect('mongodb+srv://oministack:oministack@cluster0-fdi0n.mongodb.net/semana09?retryWrites=true&w=majority',{ useNewUrlParser:true,
  useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection', socket =>{

  const { user_id } = socket.handshake.query; // pegando o user id do front-end

  connectedUsers[user_id] = socket.id; //estou relacionando o id do usuário
  // com o id da conexao socket.
  })
  //next é para continuiar o fluxo.
app.use((req, res, next)=>{
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

// GET, POST, PUT, DELETE.

// req.query. = Acessar query params (para filtros).
// req.params = Acessar route params (para edicao, delete).
// req.body = Acessar corpo da requisião (para criacão, edicao).


app.use(cors());
app.use(express.json());
app.use('/files',express.static(path.resolve(__dirname,'..','uploads')))
app.use(routes);
server.listen(3333);
