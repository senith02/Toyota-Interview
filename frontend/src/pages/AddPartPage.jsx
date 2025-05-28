import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddPartForm from '../components/AddPartForm';

function AddPartPage({ part, onChange, onSubmit, error }) {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(e);
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <div>
      <div className="page-header">
        <h1>Add New Part</h1>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-container">
        <AddPartForm
          part={part}
          onChange={onChange}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
        />
      </div>
    </div>
  );
}

export default AddPartPage;