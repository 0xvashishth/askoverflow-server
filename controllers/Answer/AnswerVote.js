const Question = require('../../model/questionSchema');

const voteAnswer = async (req, res, next) => {
  const { vote, answerid } = req.body;
  // console.log(req.userId)
  // console.log("Verified for vote");
  if(vote == 1){
    // console.log(vote);
  }else if(vote == -1){
    // console.log(vote);
  }else{
    console.log(vote);
    return res.status(422).json({ error: "You did something wrong!!!!" });
  }
  
  // var upote,downvote;
  var tokenforone=1;
  try{
    const answerupvotecheck = await Question.findOne({ answers : { $elemMatch: {_id: answerid, liked_by: { $elemMatch : { likes: req.userId  } } } } });
    // db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})
    // console.log("ele metch ", answerupvotecheck)
    if(answerupvotecheck){
      // console.log("before here log")
      // console.log(answerupvotecheck.answers[4]);
      // console.log("here log")
      tokenforone = 0;
      if(vote == 1){
        return res.status(422).json({ error: "You cannot upvote an answer for more than once!" });
      }else if(vote == -1){
          try {
            var answeravailable = await Question.updateOne(
              { "answers._id": answerid },
                {
                  $push: {
                    "answers.$.unliked_by": {
                      "unlikes": req.userId,
                    }
                  },
                  $pull: {
                    "answers.$.liked_by": {
                      "likes": req.userId,
                    }
                  }
                }
            );
            if (!answeravailable) {
              return res.status(422).json({ error: "You did something wrong!!" });
            }
            else {
              // console.log(answeravailable);
              // console.log("Answer found for down-vote!");
              return res.status(201).json({ message: "Answer Down-Voted Successfully!!", given_vote:-2 });
            }
          } catch (err) {
            console.log(err);
            return res.status(500).json({
              error: 'Something went wrong in server!'
            });
          }
      }
      // upvote=1;
    }
    // const answerdownvotecheck = await Question.findOne({ answers : { unliked_by : { $elemMatch: { unlikes: req.userId } } } });
    // const answerdownvotecheck = await Question.findOne({_id:questionid},{ answers : { _id: answerid, unliked_by : { unlikes: req.userId  } } });
    const answerdownvotecheck = await Question.findOne({ answers : { $elemMatch: {_id: answerid, unliked_by: { $elemMatch : { unlikes: req.userId  } } } } });
    if(answerdownvotecheck){
      tokenforone = 0;
      if(vote == -1){
        return res.status(422).json({ error: "You cannot down-vote an answer for more than once!" });
      }
      else if(vote == 1){
        try {
            var answeravailable = await Question.updateOne(
              { "answers._id": answerid },
                {
                  $pull: {
                    "answers.$.unliked_by": {
                      "unlikes": req.userId,
                    }
                  },
                  $push: {
                    "answers.$.liked_by": {
                      "likes": req.userId,
                    }
                  }
                }
            );
            if (!answeravailable) {
              return res.status(422).json({ error: "You did something wrong!!" });
            }
            else {
              // console.log("Answer found for up-vote!");
              return res.status(201).json({ message: "Answer Up-Voted Successfully!!", given_vote:2 });
            }
          } catch (err) {
            console.log(err);
            return res.status(500).json({
              error: 'Something went wrong in server!'
            });
          }
      }
    }
  }catch(err){
    console.log(err);
    return res.status(500).json({
      error: 'Something went wrong in server!'
    });
  }
// return res.status(200).json({
//               error: 'Something went good no'
//             });
  // First time doing votes
  if(tokenforone === 1){
  if(vote == 1){
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
        return res.status(422).json({ error: "You did something wrong!!" });
      }
      else {
        // console.log("Answer found for vote!");
        return res.status(201).json({ message: "Answer Voted Successfully!!", given_vote:1 });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Something went wrong in server!'
      });
    }
  }
  else if(vote == -1){
    try {
      var answeravailable = await Question.updateOne(
        { "answers._id": answerid },
          {
            $push: {
              "answers.$.unliked_by": {
                "unlikes": req.userId,
              }
            }
          }
      );
      if (!answeravailable) {
        return res.status(422).json({ error: "You did something wrong!!" });
      }
      else {
        // console.log("Answer found for vote!");
        return res.status(201).json({ message: "Answer Down-Voted Successfully!!", given_vote:-1 });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Something went wrong in server!'
      });
    }
  }
  }
}

module.exports = {
  voteAnswer,
}