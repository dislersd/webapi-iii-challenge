const express = require("express");
const server = express();
const router = require("./router.js");

server.use(express.json());

server.get("/", async (req, res) => {
  const env = process.env.HELLO;
  try {
    res.status(200).send(env);
  } catch (error) {
    res.status(500).json({ message: "error loading page" });
  }
});

server.use(router);

module.exports = server;
