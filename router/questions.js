const express = require('express');
const router = express.Router();
// const connectDB = require('../config/db');
// const User = require('../model/userSchema');
const Question = require('../model/questionSchema');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const mailsender = require('../controllers/mailer')
const Authenticate = require('../middleware/authenticate')


router.post('/questionpost', Authenticate, async (req, res) => {

  const { header, tags, body } = req.body;
  if (!header || !body) {
    return res.status(422).json({ error: "Please Fill the properties" });
  }

  try {
    const question = new Question({ header: header, tags: tags, body: body, posted_by: req.userId });

    const questionRegister = await question.save();
    if (questionRegister) {
      return res.status(201).json({ message: "Question posted successfully" });
    } else {
      res.status(500).json({ error: "Failed to post question" });
    }

  } catch (err) {
    console.log(err);
  }

});

module.exports = router;