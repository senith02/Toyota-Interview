import React from 'react';
import PartForm from './PartForm';

function AddPartForm({ part, onChange, onSubmit, onCancel }) {
  return (
    <div className="form-container">
      <h2>Add New Part</h2>
      <PartForm 
        part={part}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel="Add Part"
        showCancelButton={false}
      />
    </div>
  );
}

export default AddPartForm;