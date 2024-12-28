const jwt = require("jsonwebtoken");

exports = {};

exports.getToken = async (user) => {
  // Assume this code is complete
  const token = jwt.sign({ identifier: user._id }, process.env.SECRET_KEY);
  return token;
};

module.exports = exports;
