const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // req.user get the user becouse of passport.authenticate
      const { name, thumbnail, track } = req.body;
      if (!name || !thumbnail || !track) {
        return res
          .status(301)
          .json({ err: "Insufficient details to create song." });
      }
      const artist = req.user._id;
      const songDetails = { name, thumbnail, track, artist };
      const createdSong = await Song.create(songDetails);
      return res.status(200).json(createdSong);
    } catch (error) {
      return res.status(301).json({ err: error });
    }
  }
);

// Get route to get all songs I have published.
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // We need to get all songs where artist id == currentUser._id
      const songs = await Song.find({ artist: req.user._id }).populate(
        "artist"
      );
      return res.status(200).json({ data: songs });
    } catch (error) {
      return res.status(301).json({ err: error });
    }
  }
);

// Get route to get a single song by name

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { songName } = req.params;

      // Create a regex pattern for case-insensitive substring matching.
      const regexPattern = new RegExp(songName, "i");

      // Use the regex pattern to find songs with names that contain any part of the input text.
      const songs = await Song.find({
        name: { $regex: regexPattern },
      }).populate("artist");

      return res.status(200).json({ data: songs });
    } catch (error) {
      return res.status(301).json({ err: error });
    }
  }
);

router.get(
  "/get/allsong/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const songs = await Song.find({}).populate("artist");
      return res.status(200).json({ data: songs });
    } catch (error) {
      return res.status(301).json({ err: error });
    }
  }
);

router.get("/get/logout/allsong/", async (req, res) => {
  try {
    const songs = await Song.find({}).populate("artist");
    return res.status(200).json({ data: songs });
  } catch (error) {
    return res.status(301).json({ err: error });
  }
});

router.get(
  "/get/logout/songname/:songName",
   async (req, res) => {
    try {
      const { songName } = req.params;
      const regexPattern = new RegExp(songName, "i");
      const songs = await Song.find({
        name: { $regex: regexPattern },
      }).populate("artist");
      return res.status(200).json({ data: songs });
    } catch (error) {
      return res.status(301).json({ err: error });
    }
  }
);

module.exports = router;
