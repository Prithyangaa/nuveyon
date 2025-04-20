const User = require('../models/User');

// Update profile data
exports.updateProfile = async (req, res) => {
  const { polkadotId, skills, education, workExperience } = req.body;

  if (!polkadotId) return res.status(400).json({ message: "Missing polkadotId." });

  try {
    const user = await User.findOne({ polkadotId });
    if (!user) return res.status(404).json({ message: "User not found." });

    user.profile = {
      skills: skills || user.profile.skills,
      education: education || user.profile.education,
      workExperience: workExperience || user.profile.workExperience
    };

    await user.save();
    res.status(200).json({ message: "Profile updated.", user });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error." });
  }
};
