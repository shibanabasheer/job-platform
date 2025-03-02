const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  linkedinId: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  profilePic: { type: String },
  skills: { type: [String], default: [] },
  experience: { type: String },
  location: { type: String },
  preferredRoles: { type: [String], default: [] },
});

module.exports = mongoose.model('candidate', CandidateSchema);
