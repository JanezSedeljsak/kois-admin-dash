const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./server/database/db");

const isDev = process.env.NODE_ENV !== "production";
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log('Database connected'), 
    error =>  console.log("Database can't be connected: " + error)
)

mongoose.set('useCreateIndex', true);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// auth routes
const authRoutes = require("./server/routes/auth.js");
app.use("/api/auth", authRoutes);

// point routes
const pointRoutes = require("./server/routes/point.js");
app.use("/api/common", pointRoutes);

// mobile api routes
const mobileRoutes = require("./server/routes/mobile.js");
app.use("/api/mobile", mobileRoutes);


app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});