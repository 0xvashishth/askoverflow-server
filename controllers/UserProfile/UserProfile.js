const Question = require('../../model/questionSchema');

const getUserQuestion = async (req, res, next) => {
    try {
    const allquestions = await Question.find({ posted_by: req.userId }).sort({ $natural: -1 });
    return res.status(201).json(allquestions);
  } catch (err) {
    console.log(err);
      return res.status(422).json({error: "Something went wrong!"});
  }
}
const getUserAuthenticate = async (req, res) => {
  res.status(200).json({ rootUser: req.rootUser});
}

module.exports = {
  getUserQuestion,getUserAuthenticate
}