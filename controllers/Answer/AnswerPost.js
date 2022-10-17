const Question = require('../../model/questionSchema');

const postAnswer = async (req, res, next) => {
    const { body, questionid } = req.body;
  // console.log(body, questionid);

  try {
    var questionavailable = await Question.findOne({ _id: questionid });
    if (!questionavailable) {
      return res.status(422).json({ error: "Question got wrong side!!" });
    }
    else {
      console.log("Question found for answer");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
  if (!body) {
    return res.status(422).json({ error: "Please Fill the properties" });
  }
  try {
    const answerpost = await Question.updateOne({ _id: questionid }, { $push: { "answers": { "answered_by": req.userId, "answer_body": body } } });

    if (answerpost) {
      console.log("posted")
      return res.status(201).json({ message: "Answer posted successfully" });
    } else {
      return res.status(422).json({ error: "Failed to post answer!" });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to post answer!!" });
  }
}

module.exports = {
  postAnswer,
}