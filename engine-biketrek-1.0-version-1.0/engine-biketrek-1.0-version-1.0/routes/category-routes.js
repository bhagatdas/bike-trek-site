const express = require("express");
const router = express.Router();
const HttpError = require("../exceptions/http-error");

const { firebaseAuth, adminCheck } = require("../middleware/firebase-auth");

const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category-controller");

router.post("/category", firebaseAuth, adminCheck, create);
router.get("/category/:slug", read);
router.get("/categories", list);
router.put("/category/:slug", firebaseAuth, adminCheck, update);
router.delete("/category/:slug", firebaseAuth, adminCheck, remove);

module.exports = router;
