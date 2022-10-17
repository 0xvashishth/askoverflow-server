const Question = require('../../model/questionSchema');
const User = require('../../model/userSchema');

const getDetailQuestion = async (req, res, next) => {
  try {
    if (req.query.id) {
      const questionId = req.query.id;
      let question_detail = await Question.findOne({ _id: questionId });
      var view = question_detail.views + 1;
      var data = question_detail.toJSON();
      if (question_detail) {
        const countone = await Question.updateOne({ _id: question_detail._id }, { views: view });
        var user1 = await User.findById(question_detail.posted_by);
        data.asked_by = user1['username'];
        var men1 = data._id.toString().substring(0, 8);
        var date1 = new Date(parseInt(men1, 16) * 1000)
        var time1 = date1.getDate() +
          "/" + (date1.getMonth() + 1) +
          "/" + date1.getFullYear() +
          " " + date1.getHours() +
          ":" + date1.getMinutes() +
          ":" + date1.getSeconds();
        data.posted_on = time1;
        var answerers = question_detail.answers;
        for (var i = 0; i < answerers.length; i++) {
          var user = await User.findById(answerers[i].answered_by);
          data.answers[i].answered = user['username'];
          data.answers[i].answered_on = "on this";
          var men = data.answers[i].answered_by.toString().substring(0, 8);
          var date = new Date(parseInt(men, 16) * 1000)
          var time = date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds();
          data.answers[i].answered_on = time;
        }
        return res.status(201).json(data);
      }
      else {
        return res.status(422).json({ error: "Question is no more!" });
      }
    }
  } catch (err) {
    return res.status(422).json({ error: "Try Again! We are facing issue!" });
  }
}

module.exports = {
  getDetailQuestion,
}