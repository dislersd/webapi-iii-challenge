const express = require('express')
const server = express();
const router = require('./router.js')


server.use(express.json());

server.get('/', (req, res) => {
  res.send(`Hello`)
});

server.use(router)

module.exports = server;
