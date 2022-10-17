const express = require('express');
const router = express.Router();
const Authenticate = require('../../middleware/authenticate')
const UserProfile = require('../../controllers/UserProfile/UserQuestion');


router.post('/getuserquestion', Authenticate, UserProfile.getUserQuestion);


module.exports = router;