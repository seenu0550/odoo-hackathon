import React, { useState, useEffect } from 'react';
import TechnicianHeader from '../components/TechnicianHeader.jsx';
import KanbanBoard from '../components/KanbanBoard.jsx';
import CalendarView from '../components/CalendarView.jsx';
import FilterBar from '../components/FilterBar.jsx';
import { api } from '../utils/api.js';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('kanban');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await api.getRequests();
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequest = async (id, updates) => {
    try {
      await api.updateRequest(id, updates);
      await loadRequests();
    } catch (error) {
      console.error('Failed to update request:', error);
    }
  };

  const stats = {
    total: requests.length,
    overdue: requests.filter(r => new Date(r.dueDate) < new Date() && r.status !== 'REPAIRED' && r.status !== 'SCRAP').length,
    completedToday: requests.filter(r => r.status === 'REPAIRED' && new Date(r.createdAt).toDateString() === new Date().toDateString()).length
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Loading...
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <TechnicianHeader />
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px', 
          marginBottom: '24px' 
        }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0 0 8px 0' }}>Total Requests</h3>
            <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>{stats.total}</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0 0 8px 0' }}>Overdue</h3>
            <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#dc2626', margin: 0 }}>{stats.overdue}</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0 0 8px 0' }}>Completed Today</h3>
            <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>{stats.completedToday}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          <div style={{ borderBottom: '1px solid #e5e7eb' }}>
            <nav style={{ display: 'flex', padding: '0 24px' }}>
              <button
                onClick={() => setActiveTab('kanban')}
                style={{
                  padding: '16px 4px',
                  marginRight: '32px',
                  borderBottom: activeTab === 'kanban' ? '2px solid #3b82f6' : '2px solid transparent',
                  fontWeight: '500',
                  fontSize: '14px',
                  color: activeTab === 'kanban' ? '#2563eb' : '#6b7280',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Kanban Board
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                style={{
                  padding: '16px 4px',
                  borderBottom: activeTab === 'calendar' ? '2px solid #3b82f6' : '2px solid transparent',
                  fontWeight: '500',
                  fontSize: '14px',
                  color: activeTab === 'calendar' ? '#2563eb' : '#6b7280',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Calendar View
              </button>
            </nav>
          </div>

          <FilterBar 
            requests={requests}
            onFilter={setFilteredRequests}
          />

          <div style={{ padding: '24px' }}>
            {activeTab === 'kanban' ? (
              <KanbanBoard 
                requests={filteredRequests}
                onUpdateRequest={handleUpdateRequest}
              />
            ) : (
              <CalendarView requests={filteredRequests} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;