import React from 'react';

const CalendarView = ({ requests }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', margin: 0 }}>Maintenance Calendar</h2>
        <div style={{ fontSize: '16px', color: '#4a5568' }}>📅 {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', marginBottom: '20px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{
              padding: '12px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '600',
              color: '#4a5568',
              backgroundColor: '#f8fafc'
            }}>{day}</div>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
          {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
            const dayRequests = requests.filter(req => {
              const reqDate = new Date(req.dueDate);
              return reqDate.getDate() === day && reqDate.getMonth() === new Date().getMonth();
            });
            
            return (
              <div key={day} style={{
                minHeight: '80px',
                padding: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '14px',
                color: '#2d3748'
              }}>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>{day}</div>
                {dayRequests.map((req, index) => (
                  <div key={index} style={{
                    fontSize: '10px',
                    padding: '2px 4px',
                    backgroundColor: req.type === 'Preventive' ? '#dbeafe' : '#fef3c7',
                    color: req.type === 'Preventive' ? '#1e40af' : '#92400e',
                    borderRadius: '4px',
                    marginBottom: '2px'
                  }}>{req.task}</div>
                ))}
              </div>
            );
          })}
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#dbeafe', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '14px', color: '#4a5568' }}>Preventive Maintenance</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#fef3c7', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '14px', color: '#4a5568' }}>Corrective Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;