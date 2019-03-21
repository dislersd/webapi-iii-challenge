const express = require('express');
const router = express.Router();

const postDb = require("./data/helpers/postDb");

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