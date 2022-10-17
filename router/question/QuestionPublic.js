const express = require('express');
const router = express.Router();
const User = require('../../model/userSchema');
const Question = require('../../model/questionSchema');
const QuestionDetail = require('../../controllers/QuestionPublic/QuestionDetail');
const QuestionPublic = require('../../controllers/QuestionPublic/QuestionPublic');

router.get('/publicquestionsget', QuestionPublic.getPublicQuestion);
router.get('/question', QuestionDetail.getDetailQuestion);

module.exports = router;