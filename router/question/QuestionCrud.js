const express = require('express');
const router = express.Router();
const Question = require('../../model/questionSchema');
const Authenticate = require('../../middleware/authenticate')
const QuestionEdit = require('../../controllers/Question/QuestionEdit')
const QuestionPost = require('../../controllers/Question/QuestionPost')
const QuestionVote = require('../../controllers/Question/QuestionVote')
const QuestionDelete = require('../../controllers/Question/QuestionDelete')

router.post('/questionedit', Authenticate, QuestionEdit.editQuestion);
router.post('/questionvote', Authenticate, QuestionVote.voteQuestion);
router.post('/questionpost', Authenticate, QuestionPost.postQuestion);
router.post('/questiondelete', Authenticate, QuestionDelete.deleteQuestion);

module.exports = router;