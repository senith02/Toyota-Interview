import React from 'react';
import { Link } from 'react-router-dom';

function PartsTable({ parts, onEdit, onDelete, isLink = false }) {
  return (
    <div className="parts-table">
      <h2>Parts Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Part Type</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.length > 0 ? (
            parts.map(part => (
              <tr key={part.ID}>
                <td>{part.ID}</td>
                <td>{part.Name}</td>
                <td>{part.PartType}</td>
                <td>{part.Brand}</td>
                <td>{part.Quantity}</td>
                <td>${part.Price ? part.Price.toFixed(2) : '0.00'}</td>
                <td>{part.Status}</td>
                <td className="actions">
                  {isLink ? (
                    <Link to={`/parts/edit/${part.ID}`} className="btn-edit">Edit</Link>
                  ) : (
                    <button onClick={() => onEdit(part)} className="btn-edit">Edit</button>
                  )}
                  <button onClick={() => onDelete(part.ID)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No parts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PartsTable;