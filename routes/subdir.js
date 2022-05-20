const express = require("express");
const router = express.Router();
const path = require("path");

router.get(`^/$|/index(.html)?`, (req, res) => {
  //router.get(`/`, (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
  //next();
});

router.get(`/test(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

module.exports = router;

/*
Note for research: Why do I have to use next function for the code to run as above?
Initial code as indicated below only works with localhost:3500/subdir 
  but does not work with http://localhost:3500/subdir/test.

    router.get(`^/|/index(.html)?`, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
  });

  router.get(`/test(.html)?`, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
  })

  */
