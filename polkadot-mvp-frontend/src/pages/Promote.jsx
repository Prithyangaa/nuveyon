import { useState, useEffect } from 'react';
import { promoteToEmployer } from '../services/api';

function Promote() {
  const [user, setUser] = useState(null);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle promotion
  const handlePromote = async () => {
    try {
      const response = await promoteToEmployer(user.polkadotId);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      alert(response.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error promoting to employer');
    }
  };

  if (!user) {
    return (
      <div className="text-center my-4">
        <h2>Please connect your wallet to promote your role.</h2>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="my-4">Promote to Employer</h1>
      {user.role === 'employer' ? (
        <p className="lead">You are already an employer!</p>
      ) : (
        <>
          <p className="lead mb-4">Upgrade to an employer to create contracts.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handlePromote}
          >
            Become an Employer
          </button>
        </>
      )}
    </div>
  );
}

export default Promote;