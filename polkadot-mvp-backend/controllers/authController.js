const User = require('../models/User');

exports.connectWallet = async (req, res) => {
  const { name, polkadotId } = req.body;

  if (!polkadotId) return res.status(400).json({ message: "Polkadot ID is required." });

  try {
    let user = await User.findOne({ polkadotId });

    if (!user) {
      user = new User({ name, polkadotId });
      await user.save();
      return res.status(201).json({ message: "User created", user });
    }

    return res.status(200).json({ message: "User already exists", user });

  } catch (error) {
    console.error("Wallet Connect Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.promoteToEmployer = async (req, res) => {
    const { polkadotId } = req.body;
  
    try {
      const user = await User.findOne({ polkadotId });
      if (!user) return res.status(404).json({ message: "User not found." });
  
      user.role = 'employer';
      await user.save();
  
      res.status(200).json({ message: "User promoted to employer.", user });
    } catch (err) {
      console.error("Promotion error:", err);
      res.status(500).json({ message: "Server error." });
    }
  };
  