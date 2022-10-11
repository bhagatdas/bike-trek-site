const express = require("express");
const router = express.Router();
const HttpError = require("../exceptions/http-error");
const {
  createOrUpdateUser,
  currentUser,
  updateUser,
} = require("../controllers/user-controller");
const { check } = require("express-validator");
const { firebaseAuth, adminCheck } = require("../middleware/firebase-auth");

//router.post('/adduser',[
//  check('googleId').not().isEmpty(),check('email').normalizeEmail().isEmail()
//], usersController.login);

router.post("/adduser", firebaseAuth, createOrUpdateUser);
router.post("/current-user", firebaseAuth, currentUser);
router.post("/updateuser", firebaseAuth, updateUser);
router.post("/current-admin", firebaseAuth, adminCheck, currentUser);
//router.post('/add', placesController.addPlace);
//router.patch('/update',placesController.updatePlace);
//router.delete('/delete',placesController.deletePlace);

module.exports = router;
