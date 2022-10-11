const Category = require("../models/category");
const slugify = require("slugify");
const HttpError = require("../exceptions/http-error");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const addedCategory = await new Category({
      name,
      slug: slugify(name),
    }).save();

    res.json(addedCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res, next) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res, next) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.remove = async (req, res, next) => {
  try {
    console.log("DLETE HERE dasdas ",req.params.slug);
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    console.log("DLETE HERE ",deleted);
    res.json(deleted);
  } catch (err) {
    console.log(err);
    next(new HttpError("Delete category failed", 400));
  }
};

exports.update = async (req, res) => {
  const { updatedName } = req.body;
  console.log(req.params);
  console.log("update ",updatedName);
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name : updatedName, slug: slugify(updatedName) },
      { new: true }
    );
    console.log("updated data ",updated);
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Category update failed");
  }
};