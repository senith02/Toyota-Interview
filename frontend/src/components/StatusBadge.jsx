import React from 'react';

function StatusBadge({ status }) {
  const statusClass = status ? status.replace(/\s+/g, '-').toLowerCase() : 'unknown';
  return (
    <span className={`status ${statusClass}`}>
      {status || 'Unknown'}
    </span>
  );
}

export default StatusBadge;