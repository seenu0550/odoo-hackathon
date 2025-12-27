import React, { useState, useEffect } from 'react';

const FilterBar = ({ requests, onFilter }) => {
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    status: '',
    overdueOnly: false,
    myRequestsOnly: false
  });

  useEffect(() => {
    applyFilters();
  }, [filters, requests]);

  const applyFilters = () => {
    let filtered = [...requests];

    if (filters.search) {
      filtered = filtered.filter(r => 
        r.equipment.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.priority) {
      filtered = filtered.filter(r => r.priority === filters.priority);
    }

    if (filters.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    if (filters.overdueOnly) {
      filtered = filtered.filter(r => 
        new Date(r.dueDate) < new Date() && 
        r.status !== 'REPAIRED' && 
        r.status !== 'SCRAP'
      );
    }

    if (filters.myRequestsOnly) {
      filtered = filtered.filter(r => r.assignedTo === 'John Smith' || r.assignedTo === 'Current User');
    }

    onFilter(filtered);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      priority: '',
      status: '',
      overdueOnly: false,
      myRequestsOnly: false
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px'
  };

  return (
    <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px' 
      }}>
        <div style={{ gridColumn: 'span 2' }}>
          <input
            type="text"
            placeholder="Search equipment, subject, location..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            style={inputStyle}
          />
        </div>
        
        <select
          value={filters.priority}
          onChange={(e) => setFilters({...filters, priority: e.target.value})}
          style={inputStyle}
        >
          <option value="">All Priorities</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          style={inputStyle}
        >
          <option value="">All Status</option>
          <option value="NEW">New</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REPAIRED">Repaired</option>
          <option value="SCRAP">Scrap</option>
        </select>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={filters.overdueOnly}
              onChange={(e) => setFilters({...filters, overdueOnly: e.target.checked})}
              style={{ marginRight: '8px' }}
            />
            Overdue Only
          </label>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={filters.myRequestsOnly}
              onChange={(e) => setFilters({...filters, myRequestsOnly: e.target.checked})}
              style={{ marginRight: '8px' }}
            />
            My Requests
          </label>
        </div>

        <button
          onClick={clearFilters}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e5e7eb',
            color: '#374151',
            borderRadius: '6px',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Clear Filters
        </button>
      </div>
      
      <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280' }}>
        Showing {requests.filter(r => {
          let match = true;
          if (filters.search) {
            match = match && (r.equipment.toLowerCase().includes(filters.search.toLowerCase()) ||
                            r.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
                            r.location.toLowerCase().includes(filters.search.toLowerCase()));
          }
          if (filters.priority) match = match && r.priority === filters.priority;
          if (filters.status) match = match && r.status === filters.status;
          if (filters.overdueOnly) match = match && new Date(r.dueDate) < new Date() && r.status !== 'REPAIRED' && r.status !== 'SCRAP';
          if (filters.myRequestsOnly) match = match && (r.assignedTo === 'John Smith' || r.assignedTo === 'Current User');
          return match;
        }).length} of {requests.length} requests
      </div>
    </div>
  );
};

export default FilterBar;