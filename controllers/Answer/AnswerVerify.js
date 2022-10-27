const Question = require('../../model/questionSchema');

const verifyAnswer = async (req, res, next) => {
  const { questionid, answerid } = req.body;
  console.log(questionid);
  console.log(answerid);
  if(questionid == null || answerid == null) {
    return res.status(422).json({error: "Something went wrong!!!"});
  }
  const question = await Question.findOne({ _id: questionid });
  const answer = await Question.findOne({ 'answers._id': answerid });
  if(question == null || answer == null) {
    return res.status(422).json({error: "404 Something went wrong!!"});
  }
  if(req.userId.toString() !== question.posted_by.toString()){
    return res.status(422).json({error: "You are not the owner of this question!"});
  }
  const answerveify = 
    await Question.updateOne({'answers._id': answerid },
            {"$set": {
              'answers.$.is_verified': true,
              'is_answer_verified': true
              }
            });
  if(answerveify == null) {
    return res.status(422).json({error: "Something went wrong!!!!"});
  }
  res.status(200).json({message: "Answer verified!"});
};

module.exports = {
  verifyAnswer,
}