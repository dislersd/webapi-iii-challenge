const express = require("express");
const server = express();
const userRouter = require("./userRouter.js");
const postsRouter = require("./postsRouter.js")

server.use(express.json());
server.use('/users', userRouter);
server.use('/posts', postsRouter);

server.get("/", async (req, res) => {
  const env = process.env.HELLO;
  try {
    res.status(200).send(env);
  } catch (error) {
    res.status(500).json({ message: "error loading page" });
  }
});

module.exports = server;
