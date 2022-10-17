const Question = require('../../model/questionSchema');

const voteQuestion = async (req, res, next) => {
  const { vote, questionid } = req.body;
  console.log(req.userId)
  console.log("Verified for vote");
  if(vote == 1){
    console.log(vote);
  }else if(vote == -1){
    console.log(vote);
  }else{
    console.log(vote);
    return res.status(422).json({ error: "You did something wrong!!!!" });
  }
  
  // var upote,downvote;
  var tokenforone=1;
  try{
    const questionupvotecheck = await Question.findOne({_id: questionid, liked_by : { $elemMatch: {likes: req.userId } } });
    // db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})
    // console.log("ele metch ", answerupvotecheck)
    if(questionupvotecheck){
      // console.log("before here log")
      console.log("found voted person")
      // console.log("here log")
      tokenforone = 0;
      if(vote == 1){
        return res.status(422).json({ error: "You cannot upvote an answer for more than once!" });
      }else if(vote == -1){
          try {
            var questionavailable = await Question.updateOne(
              { _id: questionid },
                {
                  $push: {
                    unliked_by: {
                      "unlikes": req.userId,
                    }
                  },
                  $pull: {
                    liked_by: {
                      "likes": req.userId,
                    }
                  }
                }
            );
            if (!questionavailable) {
              return res.status(422).json({ error: "You did something wrong!!" });
            }
            else {
              console.log(questionavailable);
              console.log("question found for down-vote!");
              return res.status(201).json({ message: "Question Down-Voted Successfully!!", given_vote:-2 });
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

    const questiondownvotecheck = await Question.findOne({_id: questionid, unliked_by : { $elemMatch: {unlikes: req.userId } } });
    if(questiondownvotecheck){
      tokenforone = 0;
      if(vote == -1){
        return res.status(422).json({ error: "You cannot down-vote an question for more than once!" });
      }
      else if(vote == 1){
        try {
            var questionavailable = await Question.updateOne(
              { _id: questionid },
                {
                  $pull: {
                    unliked_by: {
                      "unlikes": req.userId,
                    }
                  },
                  $push: {
                    liked_by: {
                      "likes": req.userId,
                    }
                  }
                }
            );
            if (!questionavailable) {
              return res.status(422).json({ error: "You did something wrong!!" });
            }
            else {
              console.log("Question found for up-vote!");
              return res.status(201).json({ message: "Question Up-Voted Successfully!!", given_vote:2 });
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
      var questionavailable = await Question.updateOne(
        { _id: questionid },
          {
            $push: {
              liked_by: {
                "likes": req.userId,
              }
            }
          }
      );
      if (!questionavailable) {
        return res.status(422).json({ error: "You did something wrong!!" });
      }
      else {
        console.log("question found for vote!");
        return res.status(201).json({ message: "Question Voted Successfully!!", given_vote:1 });
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
      var questionavailable = await Question.updateOne(
        { _id: questionid },
          {
            $push: {
              unliked_by: {
                "unlikes": req.userId,
              }
            }
          }
      );
      if (!questionavailable) {
        return res.status(422).json({ error: "You did something wrong!!" });
      }
      else {
        console.log("question found for vote!");
        return res.status(201).json({ message: "Question Down-Voted Successfully!!", given_vote:-1 });
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
  voteQuestion,
}