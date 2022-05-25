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

module.exports = corsOptions;
