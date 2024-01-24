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
      // req.user gets the user because of passport.authenticate
      const { name, thumbnail, track, userId } = req.body;
      if (!name || !thumbnail || !track) {
        return res
          .status(301)
          .json({ err: "Insufficient details to create a song." });
      }
      const artist = req.user._id;
      const songDetails = { name, thumbnail, track, artist };
      const createdSong = await Song.create(songDetails);

      // Update the user to be an artist
      await User.updateOne({ _id: userId }, { isArtist: true });

      return res.status(200).json(createdSong);
    } catch (error) {
      return res.status(301).json({ err: error.message });
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

router.get("/get/logout/songname/:songName", async (req, res) => {
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
});

router.get("/edit/:songId", async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await Song.findOne({ _id: songId }).populate();
    return res.status(200).json({ data: song });
  } catch (error) {
    return res.status(301).json({ err: error });
  }
});

router.post(
  "/edit/:songId/update",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { name, thumbnail, track } = req.body;
      const { songId } = req.params;
      if (!name || !thumbnail || !track) {
        return res
          .status(301)
          .json({ err: "Insufficient details to create song." });
      }
      const songDetails = { name, thumbnail, track };
      const createdSong = await Song.updateOne({ _id: songId }, songDetails);
      return res.status(200).json(createdSong);
    } catch (error) {
      return res.status(301).json({ err: error });
    }
  }
);
router.get(
  "/edit/:songId/delete",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { songId } = req.params;
      await Song.deleteOne({ _id: songId });
      return res.status(200).json({ data: "Succssfully deleted" });
    } catch (error) {
      return res.status(301).json({ err: error });
    }
  }
);

// API to like a song
router.get("/like/:userId/:songId", async (req, res) => {
  try {
    const { userId, songId } = req.params;

    // Check if the user already liked the song
    const user = await User.findById(userId);
    console.log(user);
    if (user.likedSongs.includes(songId)) {
      // If the song is already liked, remove it from the likedSongs array
      await User.updateOne({ _id: userId }, { $pull: { likedSongs: songId } });
      return res.status(200).json({ msg: "Song unliked successfully" });
    } else {
      // If the song is not liked, add it to the likedSongs array
      await User.updateOne({ _id: userId }, { $push: { likedSongs: songId } });
      return res.status(200).json({ msg: "Song liked successfully" });
    }
  } catch (error) {
    return res.status(301).json({ err: error.msg });
  }
});

// API to remove a liked song
router.get(
  "/liked/:userId/:songId",
  async (req, res) => {
    try {
      const { userId, songId } = req.params;

      // Find the user by userId
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the songId is in the likedSongs array of the user
      const likedStatus = user.likedSongs.includes(songId);

      return res.status(200).json({ liked: likedStatus });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: "Internal Server Error" });
    }
  }
);

module.exports = router;
