const express = require("express");
const router = express.Router();
const HttpError = require("../exceptions/http-error");

const { firebaseAuth, adminCheck } = require("../middleware/firebase-auth");

const { create, read } = require("../controllers/post-controller");

router.post("/post", firebaseAuth, adminCheck, create);
router.get("/posts", read);

module.exports = router;
