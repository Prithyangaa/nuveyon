const Notification = require('../models/Notification');

// Send Notification
exports.sendNotification = async (req, res) => {
  const { toUserId, message, contractId } = req.body;

  if (!toUserId || !message) {
    return res.status(400).json({ message: "Missing fields." });
  }

  try {
    const notification = new Notification({ toUserId, message, contractId });
    await notification.save();

    res.status(201).json({ message: "Notification sent.", notification });
  } catch (err) {
    console.error("Notification error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all notifications for a user
exports.getNotifications = async (req, res) => {
  const { polkadotId } = req.params;

  try {
    const notifications = await Notification.find({ toUserId: polkadotId }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

// notificationController.js
exports.markNotificationAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    notification.isRead = true;
    await notification.save();
    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (err) {
    console.error('Mark notification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
