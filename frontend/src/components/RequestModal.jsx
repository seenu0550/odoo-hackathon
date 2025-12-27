import React, { useState } from 'react';

const RequestModal = ({ request, onClose, onUpdate }) => {
  const [duration, setDuration] = useState(request.duration || '');
  const [notes, setNotes] = useState(request.notes || '');
  const [loading, setLoading] = useState(false);

  const handleMarkRepaired = async () => {
    if (!duration || duration <= 0) {
      alert('Please enter work duration (must be greater than 0)');
      return;
    }
    setLoading(true);
    try {
      await onUpdate(request.id, { 
        status: 'REPAIRED', 
        duration: parseFloat(duration),
        notes: notes || 'Repair completed successfully'
      });
      onClose();
    } catch (error) {
      alert('Failed to update request');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkScrap = async () => {
    if (window.confirm('Are you sure you want to mark this as scrap? This action cannot be undone.')) {
      setLoading(true);
      try {
        await onUpdate(request.id, { 
          status: 'SCRAP',
          notes: notes || 'Marked as scrap - beyond repair'
        });
        onClose();
      } catch (error) {
        alert('Failed to update request');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '600px',
        width: '100%',
        margin: '16px',
        maxHeight: '80vh',
        overflowY: 'auto',
        animation: 'slideIn 0.3s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Request Details</h2>
          <button
            onClick={onClose}
            style={{
              color: '#6b7280',
              fontSize: '24px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Equipment</label>
            <p style={{ fontSize: '14px', color: '#111827', margin: 0, padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>{request.equipment}</p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Priority</label>
            <p style={{ 
              fontSize: '14px', 
              color: request.priority === 'CRITICAL' ? '#991b1b' : request.priority === 'HIGH' ? '#9a3412' : request.priority === 'MEDIUM' ? '#a16207' : '#166534', 
              margin: 0, 
              padding: '8px', 
              backgroundColor: '#f9fafb', 
              borderRadius: '4px',
              fontWeight: '500'
            }}>{request.priority}</p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Status</label>
            <p style={{ fontSize: '14px', color: '#111827', margin: 0, padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>{request.status.replace('_', ' ')}</p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Location</label>
            <p style={{ fontSize: '14px', color: '#111827', margin: 0, padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>{request.location}</p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Due Date</label>
            <p style={{ 
              fontSize: '14px', 
              color: new Date(request.dueDate) < new Date() ? '#dc2626' : '#111827', 
              margin: 0, 
              padding: '8px', 
              backgroundColor: '#f9fafb', 
              borderRadius: '4px',
              fontWeight: new Date(request.dueDate) < new Date() ? '500' : 'normal'
            }}>{request.dueDate}</p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Assigned To</label>
            <p style={{ fontSize: '14px', color: '#111827', margin: 0, padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>{request.assignedTo || 'Unassigned'}</p>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Description</label>
          <p style={{ fontSize: '14px', color: '#111827', margin: 0, padding: '12px', backgroundColor: '#f9fafb', borderRadius: '4px', lineHeight: '1.5' }}>{request.description}</p>
        </div>

        {request.status === 'IN_PROGRESS' && (
          <>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Work Duration (hours) *</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={{
                  marginTop: '4px',
                  display: 'block',
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                placeholder="Enter hours worked (e.g., 2.5)"
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Repair Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                style={{
                  marginTop: '4px',
                  display: 'block',
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  resize: 'vertical',
                  fontSize: '14px'
                }}
                placeholder="Enter repair notes, parts used, observations..."
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleMarkRepaired}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#9ca3af' : '#16a34a',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {loading ? 'Updating...' : '✅ Mark as Repaired'}
              </button>
              <button
                onClick={handleMarkScrap}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#9ca3af' : '#dc2626',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {loading ? 'Updating...' : '❌ Mark as Scrap'}
              </button>
            </div>
          </>
        )}

        {request.notes && (
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px', border: '1px solid #bae6fd' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#0369a1', marginBottom: '4px' }}>Previous Notes</label>
            <p style={{ fontSize: '14px', color: '#0c4a6e', margin: 0, lineHeight: '1.5' }}>{request.notes}</p>
          </div>
        )}
        
        {request.duration > 0 && (
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#166534', marginBottom: '4px' }}>Work Summary</label>
            <p style={{ fontSize: '14px', color: '#15803d', margin: 0 }}>⏱️ Total time worked: {request.duration} hours</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestModal;