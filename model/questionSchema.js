const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret_key = process.env['SECRETKEYJWT'];
const { Schema } = mongoose;
const User = require('./userSchema');

const questionSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String,
    }
  ],
  body: {
    type: String,
    required: true
  },
  posted_by: {
    type: Schema.Types.ObjectId, ref: User,
    required: true
  },
  answers: [
    {
      answered_by: {
        type: Schema.Types.ObjectId, ref: User,
      },
      answer_body: {
        type: String,
      },
      liked_by: [
        {
          likes: {
            type: Schema.Types.ObjectId, ref: User,
          }
        }
      ]
    }
  ],
  liked_by: [
    {
      likes: {
        type: Schema.Types.ObjectId, ref: User,
      }
    }
  ]
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;