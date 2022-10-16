const express = require('express');
const router = express.Router();
const User = require('../../model/userSchema');
const Question = require('../../model/questionSchema');
const Authenticate = require('../../middleware/authenticate')


router.post('/answeredit', Authenticate, async (req, res) => {

  const { body, answerid } = req.body;
  // console.log(body, questionid);

  try {
    // var questionavailable = await Question.findOne({ _id: answerid });
    const answeravailable = await Question.findOne({ answers : { $elemMatch: {_id: answerid, answered_by: req.userId } } });
    if (!answeravailable) {
      return res.status(422).json({ error: "You are not the owner of this answer" });
    }
    else {
      console.log("Question found for edit answer");
        if (!body) {
          return res.status(422).json({ error: "Please Fill the body" });
        }else{
          // console.log(answerid);
          // console.log(body);
          const answerupdate = await Question.updateMany(
            {'answers._id': answerid },
            {"$set": {
              'answers.$.answer_body': body
              }
            });
          if(!answerupdate){
            return res.status(422).json({ error: "Something went wrong!!!!" });
          }else{
            console.log(answerupdate);
            return res.status(200).json({ message: "Answer Updated Successfully"   });
          }
        }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

module.exports = router;