const express = require('express');
const router = express.Router();
const Question = require('../model/questionSchema');
const Authenticate = require('../middleware/authenticate')

router.post('/user', Authenticate, async (req, res) => {
  console.log("user authenticated!");
  const allquestions = await Question.find({ posted_by: req.userId }).count();
  req.rootUser.allquestions = allquestions;
  res.status(200).json({ allquestions: allquestions, rootUser: req.rootUser});
});

module.exports = router;