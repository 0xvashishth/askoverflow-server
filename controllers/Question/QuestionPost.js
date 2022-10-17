const Question = require('../../model/questionSchema');

const postQuestion = async (req, res, next) => {
  const { header, tags, body } = req.body;
  if (!header || !body) {
    return res.status(422).json({ error: "Please Fill the properties" });
  }

  try {
    const question = new Question({ header: header, tags: tags, body: body, posted_by: req.userId });

    const questionRegister = await question.save();
    if (questionRegister) {
      return res.status(201).json({ message: "Question posted successfully" });
    } else {
      res.status(500).json({ error: "Failed to post question" });
    }

  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postQuestion,
}