/*
 |--------------------------------------
 | User Model
 |--------------------------------------
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: { type: String, required: true },
  userType: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  org: { type: String, required: true },
  userStatus: { type: String, required: true },
  trainingStatus: { type: String, required: true },
  roles: [String],
  directReports: [String],
  myTrainings: [String],
});

module.exports = mongoose.model("User", userSchema);
