const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from auth router');
});

router.post('/signup', (req, res) => {
  res.send('Hello from auth router signup');
});

router.post('/signin', (req, res) => {
  res.send('Hello from auth router signin');
});


module.exports = router;