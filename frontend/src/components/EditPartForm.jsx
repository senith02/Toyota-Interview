import React from 'react';
import PartForm from './PartForm';

function EditPartForm({ part, onChange, onSubmit, onCancel }) {
  if (!part) return null;
  
  return (
    <div className="form-container">
      <h2>Edit Part</h2>
      <PartForm 
        part={part}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        submitLabel="Save Changes"
        showCancelButton={true}
      />
    </div>
  );
}

export default EditPartForm;