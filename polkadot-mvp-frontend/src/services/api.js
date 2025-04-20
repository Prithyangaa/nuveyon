import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Connect wallet
export const connectWallet = async (name, polkadotId) => {
  const response = await axios.post(`${API_BASE_URL}/auth/connect-wallet`, { name, polkadotId });
  return response.data;
};

// Update profile
export const updateProfile = async (polkadotId, skills, education, workExperience) => {
  const response = await axios.post(`${API_BASE_URL}/profile/update`, {
    polkadotId,
    skills: skills.split(',').map(s => s.trim()),
    education,
    workExperience,
  });
  return response.data;
};

// Create contract
export const createContract = async (title, description, contractHash, employerId, employeeId) => {
  const response = await axios.post(`${API_BASE_URL}/contracts/create`, {
    title,
    description,
    contractHash,
    employerId,
    employeeId,
  });
  return response.data;
};

// Accept contract
export const acceptContract = async (contractId, employeeId) => {
  const response = await axios.post(`${API_BASE_URL}/contracts/accept`, { contractId, employeeId });
  return response.data;
};

// Fetch contracts (placeholder, requires backend endpoint)
export const fetchContracts = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/contracts?userId=${userId}`);
  return response.data;
};

// Fetch notifications
export const fetchNotifications = async (polkadotId) => {
  const response = await axios.get(`${API_BASE_URL}/notifications/${polkadotId}`);
  return response.data;
};

// Mark notification as read (placeholder, requires backend endpoint)
export const markNotificationAsRead = async (notificationId) => {
  const response = await axios.patch(`${API_BASE_URL}/notifications/${notificationId}/read`);
  return response.data;
};

// Promote to employer
export const promoteToEmployer = async (polkadotId) => {
  const response = await axios.post(`${API_BASE_URL}/auth/promote`, { polkadotId });
  return response.data;
};