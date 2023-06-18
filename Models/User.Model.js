const mongoose = require("mongoose");
var validator = require("email-validator");
validator.validate("test@email.com");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { JWTSecret } = require("../Config/confg");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: [true, "please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
  },
  phoneNo: {
    type: String,
    required: [true, "Please Enter Phone Number"],
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, JWTSecret, {
    expiresIn: "5d",
  });
};

UserSchema.methods.comparePassword = async function (EnteredPassword) {
  return await bcrypt.compare(EnteredPassword, this.password);
};
const UserModel = mongoose.model("Ecommerce User", UserSchema);

module.exports = UserModel;
