import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { updateProfile } from '../services/api';

function Profile() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [workExperience, setWorkExperience] = useState('');

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const response = await updateProfile(user.polkadotId, skills, education, workExperience);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      alert(response.message);
      setIsModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating profile');
    }
  };

  if (!user) {
    return (
      <div className="text-center my-4">
        <h2>Please connect your wallet to view your profile.</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="my-4">Your Profile</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text"><strong>Polkadot ID:</strong> {user.polkadotId}</p>
          <p className="card-text"><strong>Role:</strong> {user.role}</p>
          <p className="card-text"><strong>Skills:</strong> {user.profile?.skills?.join(', ') || 'None'}</p>
          <p className="card-text"><strong>Education:</strong> {user.profile?.education || 'None'}</p>
          <p className="card-text"><strong>Work Experience:</strong> {user.profile?.workExperience || 'None'}</p>
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Update Profile
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h5 className="mb-3">Update Profile</h5>
        <div className="mb-3">
          <label htmlFor="skills" className="form-label">Skills (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="education" className="form-label">Education</label>
          <input
            type="text"
            className="form-control"
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="workExperience" className="form-label">Work Experience</label>
          <textarea
            className="form-control"
            id="workExperience"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </Modal>
    </div>
  );
}

export default Profile;