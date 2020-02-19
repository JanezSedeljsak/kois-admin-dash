const express = require("express");
const router = express.Router();
const pointController = require('./../controllers/pointController');

router.route('/locations')
    .get(pointController.getAllLocations);
    
router.route('/location/:id')
    .get(pointController.getPoint);