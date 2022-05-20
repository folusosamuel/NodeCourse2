const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//Cross origin resource sharing
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

//create a funciton that will grant  cors permission for the sites to access server
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      //above means: if the domain(origin) isn't in the whitelist
      callback(null, true);
    } else {
      callback(new error("not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//built in middleware for forms
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//built in middleware to serve static files
app.use("/", express.static(path.join(__dirname, "/public"))); //('/' is optional)
app.use("/subdir", express.static(path.join(__dirname, "/public"))); //

//routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
//app.use("/employees", require("./routes/api/employees"));

//Route handlers
// app.get(
//   `/hello(.html)?`,
//   (req, res, next) => {
//     console.log("attempted to load hello.html");
//     next();
//   },
//   (req, res) => {
//     res.send("Hello World!");
//   }
// );

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
