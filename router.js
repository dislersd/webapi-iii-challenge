const express = require("express");

const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");

const router = express.Router();

function uppercase(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

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

router.post("/users", uppercase, async (req, res) => {
  try {
    const user = await userDb.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "error adding user"
    });
  }
});

router.put("/users/:id", uppercase, async (req, res) => {
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

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await userDb.remove(id);
    res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "error deleting" });
  }
});

router.get("/user-posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userPosts = await userDb.getUserPosts(id);
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({
      message: "error getting user posts"
    });
  }
});

// USERS ^
// ################################
// ################################
// POSTS v

router.get("/posts", async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "error getting posts"
    });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postDb.getById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ messge: "post not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "error retrieving post"
    });
  }
});

// router.get("/posts/:id", (req, res) => {
//   const { id } = req.params;
//   postDb
//     .getById(id)
//     .then(post => {
//       res.status(200).json(post);
//     })
//     .catch(err => {
//       res.status(500).json({
//         message: "error getting post"
//       });
//     });
// });

router.post("/posts", async (req, res) => {
  try {
    const post = await postDb.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: "error posting"
    });
  }
});

router.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = await postDb.insert(id, req.body);
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({
      message: "error updating"
    });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await postDb.remove(id);
    res.status(200).json({ message: "successfully removed" });
  } catch (error) {
    res.status(500).json({ message: "error removing" });
  }
});

module.exports = router;
