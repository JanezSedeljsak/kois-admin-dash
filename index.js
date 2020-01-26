const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require("./server/routes/auth.js");
const isDev = process.env.NODE_ENV !== 'production';
const config = require('./server/database/db');

//mongoose.connect(config.db);
//mongoose.Promise = global.Promise;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//auth routes
app.use("/api/auth", authRoutes);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);