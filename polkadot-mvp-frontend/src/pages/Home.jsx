import { useState } from 'react';
import Modal from '../components/Modal';
import { connectWallet } from '../services/api';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [polkadotId, setPolkadotId] = useState('');

  const handleConnect = async () => {
    try {
      const user = await connectWallet(name, polkadotId);
      localStorage.setItem('user', JSON.stringify(user.user)); // <-- Store user
      alert(user.message);
      setIsModalOpen(false);
      window.location.reload(); // reload to reflect session
    } catch (error) {
      alert(error.response?.data?.message || 'Error connecting wallet');
    }
  };
  
  return (
    <div className="text-center">
      <h1 className="my-4">Welcome to the Polkadot Freelance Platform</h1>
      <p className="lead mb-4">Connect your Polkadot wallet to get started.</p>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Connect Wallet
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h5 className="mb-3">Connect Wallet</h5>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="polkadotId" className="form-label">Polkadot ID</label>
          <input
            type="text"
            className="form-control"
            id="polkadotId"
            value={polkadotId}
            onChange={(e) => setPolkadotId(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleConnect}>
          Connect
        </button>
      </Modal>
    </div>
  );
}

export default Home;