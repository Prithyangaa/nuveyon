const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  polkadotId: { type: String, unique: true, required: true },
  role: { type: String, enum: ['employee', 'employer'], default: 'employee' },
  profile: {
    skills: [String],
    education: String,
    workExperience: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
