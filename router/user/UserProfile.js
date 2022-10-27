const express = require('express');
const router = express.Router();
const Authenticate = require('../../middleware/authenticate')
const UserProfile = require('../../controllers/UserProfile/UserProfile');


router.post('/getuserquestion', Authenticate, UserProfile.getUserQuestion);
router.post('/user', Authenticate, UserProfile.getUserAuthenticate);
router.post('/getuseranswers',Authenticate, UserProfile.getUserAnswers);

module.exports = router;