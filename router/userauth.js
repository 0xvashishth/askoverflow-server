const express = require('express');
const router = express.Router();
// const connectDB = require('../config/db');
// const User = require('../model/userSchema');
const Question = require('../model/questionSchema');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const mailsender = require('../controllers/mailer')
const Authenticate = require('../middleware/authenticate')


router.get('/usertest', (req, res) => {
  res.send('Hello from auth usertest');
});

router.post('/user', Authenticate, async (req, res) => {
  console.log("user authenticated!");
  const allquestions = await Question.find({ posted_by: req.userId }).count();
  req.rootUser.allquestions = allquestions;
  res.status(200).json({ allquestions: allquestions, rootUser: req.rootUser});
});

module.exports = router;