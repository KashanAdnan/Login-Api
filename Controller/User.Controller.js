const emailvalidator = require("email-validator");
const UserModel = require("../Models/User.Model.js");
const sendToken = require("../Utils/Send.Token.js");

const createUser = async (req, res) => {
  const { name, email, password, phoneNo } = req.body;
  if (emailvalidator.validate(email)) {
    const User = await UserModel.create({
      name,
      email,
      password,
      phoneNo,
    });
    sendToken(User, 201, res);
  } else {
    res.status(400).json({ success: false, error: "Invalid Email" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (emailvalidator.validate(email)) { 
    if (!email || !password) {
      res
        .send(200)
        .json({ success: false, msg: "Please Enter Email and Password" });
    }
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      res.json(200).json({ success: false, msg: "Invalid Email and Password" });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.send(200).json({ success: false, msg: "Invalid    and Password" });
    }
    sendToken(user, 200, res);
  } else {
    res.send(400).json({ success: false, error: "Invalid Email" });
  }
};
const Logout = async (req, res, next) => {
  res.cookie("Token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    succes: true,
    message: "Logout Succesfull",
  });
};

module.exports = {
  createUser,
  loginUser,
  Logout,
};
