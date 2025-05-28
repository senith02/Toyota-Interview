import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PartsTable from '../components/PartsTable';

function PartsListPage({ parts, onDelete, loading, error }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter parts based on search term
  const filteredParts = parts.filter(part => 
    part.Name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    part.PartType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.Brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Log parts data to debug IDs
  if (parts.length > 0) {
    console.log('First part data:', parts[0]);
  }
  
  if (loading) {
    return <div>Loading parts...</div>;
  }
  
  return (
    <div>
      <div className="page-header">
        <h1>Parts Inventory</h1>
        <div className="header-actions">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search parts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/parts/add" className="btn-primary">Add New Part</Link>
        </div>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <PartsTable 
        parts={filteredParts} 
        onDelete={onDelete}
        isLink={true}
      />
    </div>
  );
}

export default PartsListPage;