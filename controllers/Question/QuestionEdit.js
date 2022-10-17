const Question = require('../../model/questionSchema');

const editQuestion = async (req, res, next) => {
  console.log(req.userId)
  // console.log(body,questionid,header,tags)
  const { body, questionid, header, tags } = req.body;
  // console.log(questionid)
  // console.log(body,questionid,header,tags)
  // console.log(body, questionid);
  if(body == "" || !body || header == "" || !header || questionid == "" || !questionid){
    return res.status(422).json({ message: 'Please enter all fields' });
  }
  
  try {
    // var questionavailable = await Question.findOne({ _id: answerid });
    const questionavailable = await Question.findOne({_id: questionid});
    if (!questionavailable) {
      return res.status(422).json({ error: "You did something wrong!!" });
    }
    else {
      var owner = questionavailable.posted_by;
      // console.log(owner);
      if(owner.valueOf() !== req.userId.valueOf()){
         return res.status(422).json({ error: "You are not the owner of this question" });
      }
      // console.log("Question found for edit");
          // console.log(answerid);
          // console.log(body);
          const questionupdate = await Question.updateOne(
            {_id: questionid },
            {"$set": {
              body,header,tags
              }
            });
          if(!questionupdate){
            return res.status(422).json({ error: "Something went wrong!!!!" });
          }else{
            // console.log(questionupdate);
            return res.status(200).json({ message: "Question Updated Successfully"   });
          }
        }
    }
   catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Something went wrong'
    });
   }
}

module.exports = {
  editQuestion,
}