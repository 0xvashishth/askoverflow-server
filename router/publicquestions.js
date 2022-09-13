const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailsender = require('../controllers/mailer')
const Authenticate = require('../middleware/authenticate')
const Question = require('../model/questionSchema');


router.get('/publicarea', (req, res) => {
  res.send('Hello from auth question');
});


router.get('/publicquestionsget', async (req, res) => {

  // const { ipuser } = req.body;
  // console.log(ipuser)
  try {
    const allquestions = await Question.find();
    // console.log(allquestions);
    // console.log(allquestions.length);
    var responsedata = [];
    for (var i = 0; i < allquestions.length; i++) {
      let obj = allquestions[i];
      responsedata[i] = {}
      const user = await User.findOne({ _id: obj.posted_by });
      responsedata[i].header = obj.header;
      responsedata[i].body = obj.body;
      responsedata[i].tags = obj.tags;
      responsedata[i].author = user.name;
    }
    return res.status(201).json(responsedata);
  } catch (err) {
    console.log(err);
  }

});


module.exports = router;