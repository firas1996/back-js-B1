const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id, role, name, email) => {
  return jwt.sign({ id, role, name, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signUp = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      role: req.body.role === "admin" ? "user" : req.body.role,
    });
    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "email and password are required !!!!",
      });
    }
    const user = User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "email or password are invalid !!!!",
      });
    }
    if (!(await user.checkPass(user.password, password))) {
      res.status(400).json({
        message: "email or password are invalid !!!!",
      });
    }
    const token = createToken(user._id, user.role, user.name, user.email);
    res.status(200).json({
      message: "Logged in !!!",
      user,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};
