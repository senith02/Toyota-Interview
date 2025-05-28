import React from 'react';

function PartForm({ part, onChange, onSubmit, onCancel, submitLabel, showCancelButton }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="Name"
          value={part.Name}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Part Type:</label>
        <input
          type="text"
          name="PartType"
          value={part.PartType}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Brand:</label>
        <input
          type="text"
          name="Brand"
          value={part.Brand}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          name="Quantity"
          value={part.Quantity}
          onChange={onChange}
          required
          min="0"
        />
      </div>
      
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          name="Price"
          value={part.Price}
          onChange={onChange}
          required
          min="0"
          step="0.01"
        />
      </div>
      
      <div className="form-group">
        <label>Status:</label>
        <select
          name="status"
          value={part.status}
          onChange={onChange}
          required
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Low Stock">Low Stock</option>
        </select>
      </div>
      
      <div className="form-buttons">
        <button type="submit">{submitLabel}</button>
        {showCancelButton && (
          <button type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default PartForm;