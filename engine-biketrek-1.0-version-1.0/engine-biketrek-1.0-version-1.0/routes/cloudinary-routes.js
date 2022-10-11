const express = require("express");
const router = express.Router();
const HttpError = require("../exceptions/http-error");

const { firebaseAuth, adminCheck } = require("../middleware/firebase-auth");

const { upload, remove } = require("../controllers/cloudinary-controller");

router.post("/upload-images", firebaseAuth, adminCheck, upload);
router.get("/remove-image", firebaseAuth, adminCheck, remove);

module.exports = router;
