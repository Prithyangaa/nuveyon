const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  contractHash: String,
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  employerId: { type: String, required: true },
  employeeId: { type: String, required: true },
  isAccepted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);
