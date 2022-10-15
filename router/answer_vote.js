const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const Question = require('../model/questionSchema');

const Authenticate = require('../middleware/authenticate')


router.post('/answervote', Authenticate, async (req, res) => {

  const { vote, answerid } = req.body;
  console.log("Verified for vote");
  if(vote == 1){
    
    console.log(vote);
  }else if(vote == -1){
    console.log(vote);
  }else{
    res.status(422).json({ error: "You did something wrong!" });
  }
  try{
    const answer = await Question.findOne({ "answers.$.liked_by.likes": req.userId });
    if(answer){
      res.status(422).json({ error: "You cannot vote a answer for more than once!" });
    }
  }catch(err){
    console.log(err);
    res.status(500).json({
      error: 'Something went wrong in server!'
    });
  }

  try {
    var answeravailable = await Question.updateOne(
      { "answers._id": answerid },
        {
          $push: {
            "answers.$.liked_by": {
              "likes": req.userId,
            }
          }
        }
    );
    if (!answeravailable) {
      res.status(422).json({ error: "You did something wrong!!" });
    }
    else {
      console.log("Answer found for vote!");
      res.status(201).json({ message: "Answer Voted Successfully!!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Something went wrong in server!'
    });
  }
});

module.exports = router;