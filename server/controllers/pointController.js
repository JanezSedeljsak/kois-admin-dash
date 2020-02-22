'use strict';
const Point = require("./../models/Point");
const jwt = require("jsonwebtoken");

exports.getAllPoints = (req, res) => {
    Point.find({}, (err, point) =>  (err) ? res.send(err) : res.json(point));
};

exports.getAllLocations = (req, res) => {
    Point.find({}, { location: 1 }, (err, point) =>  (err) ? res.send(err) : res.json(point));
}

exports.newPoint = async (req, res) => {
    const data = {
        ...req.body.data, userCreated: req.USER_ID, userUpdated: req.USER_ID
    };
    const newPoint = new Point(data);
    newPoint.save((err, point) => {
        (err) ? res.send(err) : res.json(point);
    });
};

exports.getPoint = (req, res) => {
    Point.findById(req.params.id, (err, point) => {
        (err) ? res.send(err) : res.json(point);
    });
};

exports.updatePoint = (req, res) => {
    const data = {
        ...req.body.data, updatedAt: new Date(), userUpdated: req.USER_ID
    };
    Point.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, (err, point) => {
        (err) ? res.send(err) : res.json(point);
    });
};

exports.deletePoint = (req, res) => {
    Point.deleteOne({ _id: req.params.id }, (err, point) => {
        (err) ? res.send(err) : res.json({ message: 'res successfully deleted' });
    });
};