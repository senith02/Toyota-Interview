import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditPartForm from '../components/EditPartForm';

function EditPartPage({ onUpdate, error }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  
  useEffect(() => {
    const fetchPart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/parts/${id}`);
        setPart(response.data);
        setFetchError(null);
      } catch (err) {
        console.error('Error fetching part:', err);
        setFetchError('Failed to load part details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPart();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPart({
      ...part,
      [name]: name === 'Quantity' || name === 'Price' ? parseFloat(value) : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onUpdate(part, id);
    if (success) {
      navigate('/');
    }
  };
  
  if (loading) {
    return <div>Loading part details...</div>;
  }
  
  if (fetchError) {
    return <div className="error">{fetchError}</div>;
  }
  
  return (
    <div>
      <div className="page-header">
        <h1>Edit Part: {part?.Name}</h1>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <EditPartForm
        part={part}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}

export default EditPartPage;