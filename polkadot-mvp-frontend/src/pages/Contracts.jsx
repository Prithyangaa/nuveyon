import { useState, useEffect } from 'react';
import { connectToContract } from '../services/smartContract';
import Modal from '../components/Modal';
import { createContract, acceptContract, fetchContracts } from '../services/api';

function Contracts() {
  const [user, setUser] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contractHash, setContractHash] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  // Load user and fetch contracts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchContracts(parsedUser.polkadotId).then((data) => {
        setContracts(data.contracts || []);
      }).catch((error) => {
        console.error('Error fetching contracts:', error);
      });
    }
  }, []);

  // Handle contract creation
  const handleCreate = async () => {
    try {
      const response = await createContract(title, description, contractHash, user.polkadotId, employeeId);
      setContracts([...contracts, response.contract]);
      alert(response.message);
      setIsModalOpen(false);
      setTitle('');
      setDescription('');
      setContractHash('');
      setEmployeeId('');
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating contract');
    }
  };

  // Handle contract acceptance
  const handleAccept = async (contractId) => {
    try {
      const { contract, account, injector } = await connectToContract();
  
      // Send accept transaction to smart contract
      await contract.tx.accept({ gasLimit: 300000n }).signAndSend(
        account.address,
        { signer: injector.signer },
        ({ status }) => {
          if (status.isInBlock) {
            console.log('✅ Included in block!');
          } else if (status.isFinalized) {
            console.log('🎉 Finalized on chain');
            alert('Contract accepted successfully on-chain!');
          }
        }
      );
    } catch (error) {
      console.error('Smart contract error:', error);
      alert('Failed to accept contract on-chain.');
    }
  };
  

  if (!user) {
    return (
      <div className="text-center my-4">
        <h2>Please connect your wallet to view contracts.</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="my-4">Contracts</h1>
      {user.role === 'employer' && (
        <button
          className="btn btn-primary mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Create Contract
        </button>
      )}
      <div className="row">
        {contracts.map(contract => (
          <div key={contract._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{contract.title}</h5>
                <p className="card-text">{contract.description}</p>
                <p className="card-text"><strong>Status:</strong> {contract.status}</p>
                <p className="card-text"><strong>Accepted:</strong> {contract.isAccepted ? 'Yes' : 'No'}</p>
                <p className="card-text"><strong>Employee ID:</strong> {contract.employeeId}</p>
                {contract.employeeId === user.polkadotId && !contract.isAccepted && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleAccept(contract._id)}
                  >
                    Accept Contract
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h5 className="mb-3">Create Contract</h5>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contractHash" className="form-label">Contract Hash</label>
          <input
            type="text"
            className="form-control"
            id="contractHash"
            value={contractHash}
            onChange={(e) => setContractHash(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employeeId" className="form-label">Employee Polkadot ID</label>
          <input
            type="text"
            className="form-control"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          Create
        </button>
      </Modal>
    </div>
  );
}

export default Contracts;