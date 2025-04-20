const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  toUserId: { type: String, required: true }, // employee polkadotId
  message: { type: String, required: true },
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
