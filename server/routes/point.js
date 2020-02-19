const express = require("express");
const router = express.Router();
const pointController = require('./../controllers/pointController');
const authorize = require('./../middlewares/jwt');

router.route("/point")
    .post(authorize, pointController.newPoint)
    .get(authorize, pointController.getAllPoints)

route.route('/point/:id')
    .post(authorize, pointController.updatePoint)
    .get(authorize, pointController.getPoint)
    .delete(authorize, pointController.deletePoint)