const express = require("express");
const router = express.Router();
const path = require("path");

router.get(`^/$|/index(.html)?`, (req, res) => {
  //`^/|/index(.html)?` sometimes block execution of subsequent get request.
  //"/" may be prefered!
  // res.sendFile("./views/index.html", { root: __dirname }); // or
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get(`/new-page(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get(`/old-page(.html)?`, (req, res) => {
  res.redirect(301, `/new-page.html`); // 302 by default
});

module.exports = router;
