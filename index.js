const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// cors
app.use(cors({ origin: true, credentials: true }));

// Connect Database
connectDB();


// Init Middleware
app.use(express.json({ extended: false }));
// link the router
app.use(require('./router/auth'));
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

app.get('/contact', middleware, (req, res) => {
  console.log("Hello my contact");
  res.send('Hello Contact')
});

// app.get('/signup', (req, res) => {
//   res.send('Hello signup')
// });

// app.get('/signup', (req, res) => {
//   res.send('Hello signup')
// });

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));