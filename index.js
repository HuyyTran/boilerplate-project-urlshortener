require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const shortUrl = require("node-url-shortener");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
}, bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//code here
app.post("/api/shorturl", (req, res) => {
  var original = req.body.url;
  shortUrl.short(original, (err, url) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while shortening the URL" });
    } else {
      res.json({ original_url: original, short_url: url });
    }
  });
});

//end code
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
