const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

cloudinary.config({
  cloud_name: "dkuqo2t2m",
  api_key: "754321917921569",
  api_secret: "A1B5PX7Q5GlJVa9thrYRlI-rL5E",
});

module.exports = cloudinary;
