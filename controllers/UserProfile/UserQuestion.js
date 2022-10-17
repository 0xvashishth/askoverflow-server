const Question = require('../../model/questionSchema');

const getUserQuestion = async (req, res, next) => {
    try {
    console.log(req.rootUser.name)
    const allquestions = await Question.find({ posted_by: req.userId }).sort({ $natural: -1 });
    return res.status(201).json(allquestions);
  } catch (err) {
    console.log(err);
      return res.status(422).json({error: "Something went wrong!"});
  }
}


module.exports = {
  getUserQuestion
}