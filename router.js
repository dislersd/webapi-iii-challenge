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

module.exports = router;
