const express = require('express');
const router = express.Router();
const Authenticate = require('../../middleware/authenticate')
const AnswerEdit = require('../../controllers/Answer/AnswerEdit')
const AnswerPost = require('../../controllers/Answer/AnswerPost')
const AnswerVote = require('../../controllers/Answer/AnswerVote')
const AnswerVerify = require('../../controllers/Answer/AnswerVerify')

router.post('/answeredit', Authenticate, AnswerEdit.editAnswer);
router.post('/answerpost', Authenticate, AnswerPost.postAnswer);
router.post('/answervote', Authenticate, AnswerVote.voteAnswer);
router.post('/answerverify', Authenticate, AnswerVerify.verifyAnswer);

module.exports = router;