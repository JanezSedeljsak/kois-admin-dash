const express = require("express");
const router = express.Router();
const pointController = require('./../controllers/pointController');
const authorize = require('./../middlewares/jwt');

router.route("/point")
    .post(authorize, pointController.newPoint)
    .get(pointController.getAllPoints);

router.route('/point/:id')
    .post(authorize, pointController.updatePoint)
    .get(authorize, pointController.getPoint)
    .delete(authorize, pointController.deletePoint);

module.exports = router;