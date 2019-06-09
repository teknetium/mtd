/*
 |--------------------------------------
 | Training Model
 |--------------------------------------
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  desc: { type: String, required: true },
  owner: { type: String, required: true },
  dateCreated: { type: Number, required: true },
  files: [String],
  });

module.exports = mongoose.model("Training", trainingSchema);

