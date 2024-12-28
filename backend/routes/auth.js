const express = require("express");
const router = express.Router();
const User = require("../models/User");
const cookieParser = require("cookie-parser");
const { getToken } = require("../utils/helpers");

router.use(cookieParser());

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      username,
      profileBackground,
      profileText,
    } = req.body;

    // user Exists or not
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(403)
        .json({ err: "A user with this email already exists" });
    }
    const newUserData = {
      email,
      password: password,
      firstName,
      lastName,
      username,
      profileBackground,
      profileText,
    };
    const newUser = await User.create(newUserData);
    // console.log(newUserData);

    // we want to create a token to return to the user
    const token = await getToken(newUser);

    const userToReturn = { ...newUser.toJSON(), token };

    // return the result to user
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
});

router.post("/login", async (req, res) => {
  // check email exists or not
  try {
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

    const token = await getToken(user);

    // Set JWT in a persistent cookie with a 1-week expiration
    res.cookie("auth_token", token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === "production", // Secure cookie for HTTPS
      sameSite: "Strict", // Prevent CSRF
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week expiry
    });

    const userToReturn = { ...user.toJSON(), token };
    console.log(userToReturn)
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
});

router.get("/verify-login", (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).send({ err: "Not authenticated" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ err: "Token invalid or expired" });
    }

    res.json({ userId: decoded._id ,success:true});
  });
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
