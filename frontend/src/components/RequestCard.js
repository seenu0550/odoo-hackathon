import React from 'react';

const RequestCard = ({ request, onDragStart, onClick, onPickup }) => {
  const priorityColors = {
    CRITICAL: 'bg-red-100 text-red-800 border-red-200',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
    MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    LOW: 'bg-green-100 text-green-800 border-green-200'
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

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, request.id)}
      onClick={onClick}
      className={`bg-white p-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow ${
        isOverdue ? 'border-red-300 border-2' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-lg">{statusIcons[request.status]}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[request.priority]}`}>
          {request.priority}
        </span>
      </div>

      {isOverdue && (
        <div className="mb-2">
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
            OVERDUE
          </span>
        </div>
      )}

      <h4 className="font-medium text-gray-900 mb-1">{request.equipment}</h4>
      <p className="text-sm text-gray-600 mb-2">{request.subject}</p>
      <p className="text-xs text-gray-500 mb-2">📍 {request.location}</p>
      <p className="text-xs text-gray-500 mb-3">Due: {request.dueDate}</p>

      {request.status === 'NEW' && !request.assignedTo && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPickup(request.id);
          }}
          className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700"
        >
          Pick Up
        </button>
      )}

      {request.assignedTo && (
        <p className="text-xs text-gray-500">Assigned to: {request.assignedTo}</p>
      )}
    </div>
  );
};

export default RequestCard;