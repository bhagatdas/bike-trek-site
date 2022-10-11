const admin = require("../firebase");
const HttpError = require("../exceptions/http-error");
const User = require("../models/user");

exports.firebaseAuth = async (req, res, next) => {
  try {
    const firebaseuser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseuser;
    next();
  } catch (err) {
    const error = new HttpError(err.message, 401);
    return next(error);
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminuser = await User.findOne({ email }).exec();
  if (adminuser.role !== "organizer") {
    next(new HttpError("Organizer resource , Access denied", 403));
  } else {
    next();
  }
};
