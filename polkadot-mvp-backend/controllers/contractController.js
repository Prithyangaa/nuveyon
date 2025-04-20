const User = require('../models/User');
const Contract = require('../models/Contract');

// Employer creates a contract
exports.createContract = async (req, res) => {
  const { title, description, contractHash, employerId, employeeId } = req.body;

  if (!title || !employerId || !employeeId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Verify employer has correct role
    const employer = await User.findOne({ polkadotId: employerId });
    if (!employer || employer.role !== 'employer') {
      return res.status(403).json({ message: "Only employers can create contracts." });
    }

    // Check if employee exists
    const employee = await User.findOne({ polkadotId: employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const newContract = new Contract({
      title,
      description,
      contractHash,
      employerId,
      employeeId
    });

    await newContract.save();
    res.status(201).json({ message: "Contract created", contract: newContract });

  } catch (err) {
    console.error("Create contract error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

// Accept contract
exports.acceptContract = async (req, res) => {
  const { contractId, employeeId } = req.body;

  if (!contractId || !employeeId) {
    return res.status(400).json({ message: "Missing contractId or employeeId." });
  }

  try {
    const contract = await Contract.findById(contractId);
    if (!contract) return res.status(404).json({ message: "Contract not found." });

    if (contract.employeeId !== employeeId) {
      return res.status(403).json({ message: "You are not authorized to accept this contract." });
    }

    if (contract.isAccepted) {
      return res.status(400).json({ message: "Contract already accepted." });
    }

    contract.isAccepted = true;
    await contract.save();

    res.status(200).json({ message: "Contract accepted.", contract });
  } catch (err) {
    console.error("Accept contract error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

// Fetch contracts for a user
exports.getContracts = async (req, res) => {
  const { userId } = req.query;
  try {
    const contracts = await Contract.find({
      $or: [{ employerId: userId }, { employeeId: userId }],
    });
    res.status(200).json({ contracts });
  } catch (err) {
    console.error('Fetch contracts error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};