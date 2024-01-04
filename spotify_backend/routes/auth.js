const express = require("express");
const router = express.Router();
const User = require("../models/User");
const cookieParser = require("cookie-parser");
const { getToken } = require("../utils/helpers");

router.use(cookieParser());
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  // user Exists or not
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }
  const newUserData = {
    email,
    password: password,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);
  console.log(newUserData);

  // we want to create a token to return to the user
  const token = await getToken(email, newUser);

  const userToReturn = { ...newUser.toJSON(), token };

  // return the result to user
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
  // check email exists or not
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ err: "Invalid Credentials" });
  }

  //   console.log(user);

  const userPassword = user.password;
  if (password !== userPassword) {
    return res.status(403).json({ err: "invalid Credentials" });
  }

  const token = await getToken(user.email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

// router.post("/user-detail", async (req, res) => {
//   try {
//     const  {email}  = req.body;
//     console.log(email);
//     const user = await User.findOne({ email: email });
//     res.status(200).send({ user: user });
//   } catch (error) {
//     res.status(400).send({ err: "cookie not found" });
//   }
// });

module.exports = router;
