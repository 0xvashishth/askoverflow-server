const express = require('express');
const router = express.Router();
// const connectDB = require('../config/db');
// const User = require('../model/userSchema');
const Question = require('../model/questionSchema');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const mailsender = require('../controllers/mailer')
// const Authenticate = require('../middleware/authenticate')


router.get('/question', async (req, res) => {
  try {
    console.log(req.query.id)
    if (req.query.id) {
      const questionId = req.query.id;
      console.log(req.query.id)
      const question_detail = await Question.findOne({ _id: questionId });
      if (question_detail) {
        return res.status(201).json(question_detail);
      } else {
        res.status(404).json({ error: "Question is no more!" });
      }

    }
  } catch (err) {
    res.status(404).json({ error: "Try Again! We are facing issue!" });
  }
});

module.exports = router;