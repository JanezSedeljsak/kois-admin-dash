const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./server/database/db");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());

const isDev = process.env.NODE_ENV !== "production";
mongoose.connect(config.db,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//auth routes
const authRoutes = require("./server/routes/auth.js");
app.use("/api/auth", authRoutes);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
