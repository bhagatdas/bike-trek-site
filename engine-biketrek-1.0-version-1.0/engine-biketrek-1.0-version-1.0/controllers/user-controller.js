const HttpError = require("../exceptions/http-error");
const User = require("../models/user");

exports.createOrUpdateUser = async (req, res, next) => {
  const { name, picture, email, role } = req.user;
  const user = await User.findOne({ email });
  res.json(user);
  if (!user) {
    const newUser = await new User({
      email,
      name,
      picture,
      role: "traveller",
    }).save();
    res.json(newUser);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    let currentUser = await User.findOne({ email: req.user.email }).exec();
    if (currentUser) {
      res.json(currentUser);
    }
  } catch (error) {
    next(new HttpError("No current user details found", 404));
  }
};

exports.updateUser = async (req, res, next) => {
  const { name, picture, email, role, mobile, age, about } = req.body;
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
