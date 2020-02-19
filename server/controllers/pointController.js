'use strict';
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Point = require("./../models/Point");

exports.getAllPoints = function (req, res) {
    Point.find({}, (err, res) =>  (err) ? res.send(err) : res.json(res));
};

exports.getAllLocations = function (req, res) {
    Point.find({}, (err, res) =>  (err) ? res.send(err) : res.json(res));
}

exports.newPoint = function (req, res) {
    const newPoint = new Point(req.body);
    newPoint.save(function (err, res) {
        (err) ? res.send(err) : res.json(res);
    });
};

exports.getPoint = function (req, res) {
    Point.findById(req.params.resId, function (err, res) {
        (err) ? res.send(err) : res.json(res);
    });
};

exports.updatePoint = function (req, res) {
    Point.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, res) => {
        (err) ? res.send(err) : res.json(res);
    });
};

exports.deletPoint = function (req, res) {
    Point.remove({ _id: req.params.id }, (err, res) => {
        (err) ? res.send(err) : res.json({ message: 'res successfully deleted' });
    });
};