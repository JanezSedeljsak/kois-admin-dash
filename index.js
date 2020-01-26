const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const isDev = process.env.NODE_ENV !== "production";
const config = require("./server/database/db");
const morgan = require("morgan");

mongoose.connect(config.db);
mongoose.Promise = global.Promise;
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.configure(function() {
  app.use(express.bodyParser());
  app.use(app.router);
});
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
