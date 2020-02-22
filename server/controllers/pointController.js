'use strict';
const Point = require("./../models/Point");

exports.getAllPoints = (req, res) => {
    Point.find({}, (err, point) =>  (err) ? res.send(err) : res.json(point));
};

exports.getAllLocations = (req, res) => {
    Point.find({}, { location: 1 }, (err, point) =>  (err) ? res.send(err) : res.json(point));
}

exports.newPoint = (req, res) => {
    console.log(req.body.params);
    const newPoint = new Point(req.body.params.point);
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
    console.log(req.body);
    const data = req.body.params.point;
    Point.findOneAndUpdate({ _id: req.params.id }, { ...data, updatedAt: new Date() }, { new: true }, (err, point) => {
        (err) ? res.send(err) : res.json(point);
    });
};

exports.deletePoint = (req, res) => {
    Point.remove({ _id: req.params.id }, (err, point) => {
        (err) ? res.send(err) : res.json({ message: 'res successfully deleted' });
    });
};