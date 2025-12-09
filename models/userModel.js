const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required !!!"],
  },
  email: {
    type: String,
    required: [true, "The email is required !!!"],
    unique: true,
    validate: [validator.isEmail, "Email is not valid !!!"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "The password is required !!!"],
    minlength: 8,
  },
  confirm_password: {
    type: String,
    required: [true, "The password is required !!!"],
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return cPass === this.password;
      },
      message: "password does not match !!!",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  last_password_date_update: {
    type: Date,
    default: Date.now(),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
