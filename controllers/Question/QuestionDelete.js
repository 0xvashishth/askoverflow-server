const Question = require('../../model/questionSchema');

const deleteQuestion = async (req, res, next) => {
  const { questionid } = req.body;
  
  try {
    const questionavailable = await Question.findOne({_id: questionid});
    if (!questionavailable) {
      return res.status(422).json({ error: "You did something wrong!!" });
    }
    else {
      var owner = questionavailable.posted_by;
      if(owner.valueOf() !== req.userId.valueOf()){
         return res.status(422).json({ error: "You are not the owner of this question" });
      }
          const questionupdate = await Question.deleteOne({_id: questionid });
          if(!questionupdate){
            return res.status(422).json({ error: "Something went wrong!!!!" });
          }else{
            return res.status(200).json({ message: "Question Deleted Successfully"   });
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
  deleteQuestion,
}