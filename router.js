const express = require("express");

const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "error getting users"
    });
  }
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "error getting user"
      });
    });
});

router.post("/users", async (req, res) => {
  try {
    const user = await userDb.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "error adding user"
    });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = await userDb.update(id, req.body);
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({
      message: "error updating"
    });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const remove = await userDb.remove(id);
    res.status(200).json({ message: 'successfully deleted'})
  } catch (error) {
  res.status(500).json({ message: 'error deleting'})
  }
})

router.get('/user-posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userPosts = await userDb.getUserPosts(id);
    res.status(200).json(userPosts)
  } catch (error) {
    res.status(500).json({
      message: 'error getting user posts'
    })
  }
})

module.exports = router;
