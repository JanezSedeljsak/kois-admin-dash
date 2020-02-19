'use strict';
const Point = require("./../models/Point");

exports.getAllPoints = (req, res) => {
    Point.find({}, (err, point) =>  (err) ? res.send(err) : res.json(point));
};

exports.getAllLocations = (req, res) => {
    Point.find({}, (err, point) =>  (err) ? res.send(err) : res.json(point));
}

exports.newPoint = (req, res) => {
    const newPoint = new Point(req.body);
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
    Point.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, point) => {
        (err) ? res.send(err) : res.json(point);
    });
};

exports.deletePoint = (req, res) => {
    Point.remove({ _id: req.params.id }, (err, point) => {
        (err) ? res.send(err) : res.json({ message: 'res successfully deleted' });
    });
};