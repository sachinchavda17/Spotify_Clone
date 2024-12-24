const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 8080;

const client_id ="76070962bdcd48f882f5261109c9b984" ;
const client_secret ="9946c23d057c409e85c32f4bf03d5370";
const redirect_url = "http://localhost:8080/callback";

app.use(cors());
app.use(express.json());
try {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to Mongo ! ");
    })
    .catch((err)   => {
      console.error(`Error while connecting to mongo ${err} `);
      // return res.status(400).json({ err: err });
    });
} catch (error) {
  console.error(`Error while connecting to mongo ${err} `);
  // return res.status(400).json({ err: error });
}





// setup passport-jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
      // done(error, doesTheUserExist)
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

app.get("/",(req,res)=>{
  res.send("Server is running....")
})
app.use("/auth", authRoutes);
app.use("/song", songRoutes);

app.listen(port, () => {
  console.log("App is running on port " + port);
});
