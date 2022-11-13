const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailsender = require('../controllers/mailer')

router.get('/', (req, res) => {
  res.send('Hello from auth router !!');
});

// using promises
// router.post('/signup', (req, res) => {

//   const {name, email, username, password, cpassword} = req.body;

//   if(!name || !email || !username || !password || !cpassword){
//     return res.status(422).json({error: "Please Fill the properties"});
//   }

//   User.findOne({email: email})
//     .then((userExist)=>{
//     if(userExist){
//       return res.status(422).json({error: "email already exist"});
//     }

//     User.findOne({username: username})
//       .then((usernameExist)=>{
//       if(usernameExist){
//         return res.status(422).json({error: "username already exist"});
//       }

//         const user  = new User({name, email, username, password, cpassword});

//         user.save().then(()=>{
//           return res.status(201).json({message: "User registered successfully"})
//         }).catch((err)=> res.status(500).json({error: "Failed to register user"}))


//     }).catch(err => { console.log(err); })

//   }).catch(err => { console.log(err); })
// });

// using async and await
router.post('/signup', async (req, res) => {

  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(422).json({ error: "Please Fill the properties" });
  }

  try {

    const emailExist = await User.findOne({ email: email });
    const usernameExist = await User.findOne({ username: username });

    if (emailExist) {
      return res.status(422).json({ error: "Email is already exist" });
    }
    if (usernameExist) {
      return res.status(422).json({ error: "Username is already exist" });
    }

    const user = new User({ name, email, username, password });

    const userRegister = await user.save();
    const subject = ``
    if (userRegister) {
      mailsender.sendmailer(
        email,
        name
      );
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }

  } catch (err) {
    console.log(err);
  }

});


router.post('/signin', async (req, res) => {

  const { username, password } = req.body;
  console.log("Signin attempt");
  if (!username || !password) {
    return res.status(422).json({ error: "All fields are required" });
  }

  try {
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      const isMatch = await bcrypt.compare(password, usernameExist.password);

      const token = await usernameExist.generateAuthToken();

      if (isMatch) {
        return res.status(201).json({ message: "You are logged in!", jwttokenloginuser: token, userId: usernameExist._id });
      } else {
        return res.status(422).json({ error: "Passwrd is incorrect!" });
      }
    } else {
      return res.status(422).json({ error: "You are not registered!" });
    }
  } catch (err) {
    console.log(err);
  }

  res.json({ message: req.body });
  // res.send('Hello from auth router signin');
});


module.exports = router;