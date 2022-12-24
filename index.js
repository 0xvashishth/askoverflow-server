const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const bodyParser = require('body-parser')
const serverless = require('serverless-http')
const app = express();
const router = express.Router();
app.use('/.netlify/functions/api',router);
//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// cors 
app.use(cors({ origin: true, credentials: true }));

// Connect Database
connectDB();


// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.json());

// link the router
app.use(require('./router/auth'));
// app.use(require('./router/userauth.js'));
app.use(require('./router/answer/AnswerCrud.js'));
app.use(require('./router/question/QuestionCrud.js'));
app.use(require('./router/question/QuestionPublic.js'));
app.use(require('./router/user/UserProfile.js'));

// Middleware
const middleware = (req, res, next) => {
  console.log("Hello my middleware");
  next();
}
// middleware();

app.get('/', (req, res) => {
  console.log("Hello Askoverflosw!!");
  res.send('Hello Askoverflosw!!')
});

// app.get('/contact', middleware, (req, res) => {
//   console.log("Hello my contact");
//   res.send('Hello Contact')
// });

// const port = process.env.PORT || 8082;

// app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports.handler = serverless(app);