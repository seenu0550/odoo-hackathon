import React from 'react';

const RequestCard = ({ request, onDragStart, onClick, onPickup }) => {
  const priorityColors = {
    CRITICAL: { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' },
    HIGH: { bg: '#fff7ed', text: '#9a3412', border: '#fed7aa' },
    MEDIUM: { bg: '#fefce8', text: '#a16207', border: '#fde047' },
    LOW: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' }
  };

  const statusIcons = {
    NEW: '📋',
    IN_PROGRESS: '🔧',
    REPAIRED: '✅',
    SCRAP: '❌'
  };

  const isOverdue = new Date(request.dueDate) < new Date() && 
                   request.status !== 'REPAIRED' && 
                   request.status !== 'SCRAP';

  const handlePickup = (e) => {
    e.stopPropagation();
    onPickup(request.id);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, request.id)}
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: isOverdue ? '2px solid #fca5a5' : '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: 'translateY(0)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span style={{ fontSize: '18px' }}>{statusIcons[request.status]}</span>
        <span style={{
          padding: '4px 8px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: '500',
          border: `1px solid ${priorityColors[request.priority].border}`,
          backgroundColor: priorityColors[request.priority].bg,
          color: priorityColors[request.priority].text
        }}>
          {request.priority}
        </span>
      </div>

      {isOverdue && (
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            animation: 'pulse 2s infinite'
          }}>
            OVERDUE
          </span>
        </div>
      )}

      <h4 style={{ fontWeight: '500', color: '#111827', margin: '0 0 4px 0', fontSize: '16px' }}>{request.equipment}</h4>
      <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>{request.subject}</p>
      <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 8px 0' }}>📍 {request.location}</p>
      <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 12px 0' }}>Due: {request.dueDate}</p>

      {request.status === 'NEW' && !request.assignedTo && (
        <button
          onClick={handlePickup}
          style={{
            width: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          Pick Up
        </button>
      )}

      {request.assignedTo && (
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '8px 0 0 0' }}>Assigned to: {request.assignedTo}</p>
      )}
      
      {request.duration > 0 && (
        <p style={{ fontSize: '12px', color: '#059669', margin: '4px 0 0 0', fontWeight: '500' }}>⏱️ {request.duration}h worked</p>
      )}
    </div>
  );
};

export default RequestCard;