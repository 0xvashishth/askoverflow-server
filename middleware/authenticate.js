const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/userSchema');
const secret_key = process.env['SECRETKEYJWT'];

const Authenticate = async (req, res, next) => {
  try {
    const { jwttokenloginuser } = req.body;
    console.log("Auth Attempt!");
    const token = jwttokenloginuser;
    const verifytoken = jwt.verify(token, secret_key);

    const rootUser = await User.findOne({ _id: verifytoken._id, "tokens.token": token });

    if (!rootUser) {
      throw new Error("User not found");

    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (err) {
    // res.status(401).send('Unauthorized User!!')
    console.log(err);
    return res.status(401).json({ error: "Unauthorized User!!" });
  }
}

module.exports = Authenticate