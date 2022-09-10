const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = bcrypt.hash(this.password, 12);

//   }
//   console.log("This is inside!")
//   next();
// });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next()
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
})


const User = mongoose.model('USER', userSchema);

module.exports = User;