const express = require('express');
const router = express.Router();
const HttpError = require('../exceptions/http-error');
const placesController = require('../controllers/places-controller'); 
const checkAuth = require('../middleware/check-auth');

//router.use(checkAuth);

router.get('/', placesController.getPlaceById); 
router.post('/add', placesController.addPlace);
//router.patch('/update',placesController.updatePlace);
//router.delete('/delete',placesController.deletePlace);

module.exports= router;