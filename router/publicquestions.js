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

  try {
    const allquestions = await Question.find().sort({ $natural: -1 });

    var responsedata = [];
    var i;
    var counttags=0;
    for (i = 0; i < allquestions.length; i++) {
      let obj = allquestions[i];
      responsedata[i] = {}
      const user = await User.findOne({ _id: obj.posted_by });
        var men1 = user._id.toString().substring(0, 8);
        var date1 = new Date(parseInt(men1, 16) * 1000)
        var time1 = date1.getDate() +
          "/" + (date1.getMonth() + 1) +
          "/" + date1.getFullYear() +
          " " + date1.getHours() +
          ":" + date1.getMinutes() +
          ":" + date1.getSeconds();
      responsedata[i].posted_on = time1;
      responsedata[i].header = obj.header;
      responsedata[i].answer_count = obj.answers.length;
      responsedata[i].views = obj.views;
      responsedata[i].body = obj.body;
      responsedata[i].id = obj._id;
      responsedata[i].tags = obj.tags;
      counttags=counttags+obj.tags.length;
      responsedata[i].author = user.name;
      responsedata[i].username = user.username;
      responsedata[i].is_answer_verified = obj.is_answer_verified;
    }
    // console.log(i);
    responsedata[i-1].counttags = counttags;
    return res.status(201).json(responsedata);
  } catch (err) {
    console.log(err);
  }

});

router.post('/publicquestionsget', Authenticate, async (req, res) => {

  // const { ipuser } = req.body;
  // console.log(ipuser)
  try {
    console.log(req.rootUser.name)
    const allquestions = await Question.find({ posted_by: req.userId }).sort({ $natural: -1 });

    // console.log(allquestions);
    // console.log(allquestions.length);
    var responsedata = [];
    for (var i = 0; i < allquestions.length; i++) {
      let obj = allquestions[i];
      responsedata[i] = {}
      const user = await User.findOne({ _id: obj.posted_by });
      responsedata[i].header = obj.header;
      responsedata[i].id = obj._id;
      responsedata[i].body = obj.body;
      responsedata[i].tags = obj.tags;
      responsedata[i].author = user.name;
      responsedata[i].username = user.username;
    }
    return res.status(201).json(responsedata);
  } catch (err) {
    console.log(err);
  }

});


module.exports = router;