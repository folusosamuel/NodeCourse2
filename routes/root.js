const express = require("express");
const router = express.Router();
const path = require("path");

router.get(`^/$|/index(.html)?`, (req, res) => {
  //`^/|/index(.html)?` sometimes block execution of subsequent get request.
  //"/" may be prefered!
  // res.sendFile("./views/index.html", { root: __dirname }); // or
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
