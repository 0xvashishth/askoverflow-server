const express = require('express');
const router = express.Router();
// const connectDB = require('../config/db');
// const User = require('../model/userSchema');
const Question = require('../model/questionSchema');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const mailsender = require('../controllers/mailer')
// curl -H "Content-Type: application/json" -X POST -d '{"questionid": "632ecdbb6cded3e22fbe2dd9","body":"this is answer","jwttokenloginuser":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFkZjg1ZTU0OGVlMWE3NDZhYzQ1YWIiLCJpYXQiOjE2NjQ0NDQ2NDN9.naIkDDMo00WVSCBCE8Zwlqs77BHWDPjXc5Zff2VzOd0"}' https://askoverflow-server.vashishth-patel.repl.co/answerpost

const Authenticate = require('../middleware/authenticate')


router.post('/answerpost', Authenticate, async (req, res) => {

  const { body, questionid } = req.body;

  try {
    var questionavailable = await Question.findOne({ _id: questionid });
    if (!questionavailable) {
      res.status(422).json({ error: "Question got wrong side!!" });
    }
    else {
      console.log("Question found for answer");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
  if (!body) {
    return res.status(422).json({ error: "Please Fill the properties" });
  }
  try {
    const answerpost = await Question.updateOne({ _id: questionid }, { $push: { "answers": { "answered_by": req.userId, "answer_body": body } } });

    if (answerpost) {
      return res.status(201).json({ message: "Answer posted successfully" });
    } else {
      res.status(422).json({ error: "Failed to post answer!" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to post answer!!" });
  }

});

module.exports = router;