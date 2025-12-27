import React, { useState } from 'react';

const CalendarView = ({ requests }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getRequestsForDate = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return requests.filter(request => request.dueDate === dateStr);
  };
  
  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentYear, currentMonth + direction, 1));
  };
  
  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} style={{ padding: '8px', minHeight: '80px' }}></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayRequests = getRequestsForDate(day);
      const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, day).toDateString();
      
      days.push(
        <div
          key={day}
          style={{
            padding: '8px',
            minHeight: '80px',
            border: '1px solid #e5e7eb',
            backgroundColor: isToday ? '#dbeafe' : 'white',
            position: 'relative'
          }}
        >
          <div style={{ fontWeight: isToday ? 'bold' : 'normal', marginBottom: '4px' }}>
            {day}
          </div>
          
          {dayRequests.map(request => {
            const priorityColor = {
              CRITICAL: '#dc2626',
              HIGH: '#ea580c',
              MEDIUM: '#ca8a04',
              LOW: '#16a34a'
            }[request.priority];
            
            return (
              <div
                key={request.id}
                style={{
                  fontSize: '10px',
                  padding: '2px 4px',
                  marginBottom: '2px',
                  backgroundColor: priorityColor,
                  color: 'white',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                title={`${request.equipment} - ${request.subject}`}
              >
                {request.equipment}
              </div>
            );
          })}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Calendar Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        padding: '0 16px'
      }}>
        <button
          onClick={() => navigateMonth(-1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          ← Previous
        </button>
        
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        
        <button
          onClick={() => navigateMonth(1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Next →
        </button>
      </div>
      
      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        backgroundColor: '#e5e7eb',
        border: '1px solid #e5e7eb'
      }}>
        {/* Day headers */}
        {dayNames.map(dayName => (
          <div
            key={dayName}
            style={{
              padding: '12px 8px',
              backgroundColor: '#f3f4f6',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '14px'
            }}
          >
            {dayName}
          </div>
        ))}
        
        {/* Calendar days */}
        {renderCalendarDays()}
      </div>
      
      {/* Legend */}
      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Priority Legend:</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#dc2626', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '14px' }}>Critical</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#ea580c', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '14px' }}>High</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#ca8a04', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '14px' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#16a34a', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '14px' }}>Low</span>
          </div>
        </div>
        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', margin: '8px 0 0 0' }}>
          Showing {requests.length} total requests. Hover over items for details.
        </p>
      </div>
    </div>
  );
};

export default CalendarView;