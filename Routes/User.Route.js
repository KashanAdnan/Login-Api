const UserController = require("../Controller/User.Controller");
const express = require("express");
const UserRoute = express.Router();

UserRoute.post("/signUp", UserController.createUser);
UserRoute.post("/login", UserController.loginUser);
UserRoute.get("/logout", UserController.Logout);

module.exports = UserRoute;
