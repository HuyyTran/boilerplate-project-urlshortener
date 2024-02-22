require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
/** 1) Install & Set up mongoose */
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
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
});
app.get("/api/shorturl/:short_url", (req, res) => {
  var shortUrl = req.params.short_url;
  console.log(shortUrl);
  res.json({ hello: "this is the temp page of short url" });
});

// Create a'IP' model
const Schema = mongoose.Schema;
const ipSchema = new Schema({
  ipAddress: String,
});

// CCreate and save a Ip
//end code
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
