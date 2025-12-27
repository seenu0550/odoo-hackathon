import React, { useState } from 'react';
import Header from './components/Header.jsx';
import RequestsTab from './components/RequestsTab.jsx';
import EquipmentTab from './components/EquipmentTab.jsx';

function UserDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('requests');
  const [showUserModal, setShowUserModal] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, equipment: 'Printer HP-001', type: 'Corrective', status: 'New', date: '2025-01-15' },
    { id: 2, equipment: 'AC Unit-205', type: 'Corrective', status: 'In Progress', date: '2025-01-14' },
    { id: 3, equipment: 'Laptop DEL-123', type: 'Corrective', status: 'Repaired', date: '2025-01-13' }
  ]);
  
  const [equipment] = useState([
    { id: 1, name: 'Printer HP-001', category: 'Office Equipment', team: 'IT Support' },
    { id: 2, name: 'AC Unit-205', category: 'HVAC', team: 'Facilities' },
    { id: 3, name: 'Laptop DEL-123', category: 'IT Equipment', team: 'IT Support' }
  ]);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    mainContent: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
    },
    tabs: {
      display: 'flex',
      gap: '10px',
      marginBottom: '30px',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '0'
    },
    tab: {
      padding: '12px 24px',
      background: 'transparent',
      border: 'none',
      borderRadius: '12px 12px 0 0',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: '#718096'
    },
    activeTab: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      minWidth: '300px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
    }
  };

  return (
    <div style={styles.container}>
      <Header user={user} onUserClick={() => setShowUserModal(true)} />
      
      <div style={styles.mainContent}>
        <div style={styles.tabs}>
          <button
            style={activeTab === 'requests' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab('requests')}
          >
            📋 My Requests
          </button>
          <button
            style={activeTab === 'equipment' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab('equipment')}
          >
            🔧 Equipment
          </button>
        </div>

        {activeTab === 'requests' && (
          <RequestsTab 
            requests={requests} 
            setRequests={setRequests} 
            equipment={equipment} 
          />
        )}

        {activeTab === 'equipment' && (
          <EquipmentTab equipment={equipment} />
        )}
      </div>

      {showUserModal && (
        <div style={styles.modal} onClick={() => setShowUserModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600', color: '#2d3748' }}>User Details</h3>
            <p style={{ margin: '10px 0', fontSize: '16px', color: '#4a5568' }}>Name: {user?.name || user?.email?.split('@')[0] || 'User'}</p>
            <p style={{ margin: '10px 0', fontSize: '16px', color: '#4a5568' }}>Role: {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Employee'}</p>
            <p style={{ margin: '10px 0', fontSize: '16px', color: '#4a5568' }}>Email: {user?.email || 'N/A'}</p>
            <p style={{ margin: '10px 0', fontSize: '16px', color: '#4a5568' }}>Department: Operations</p>
            <button 
              onClick={() => setShowUserModal(false)}
              style={{
                marginTop: '20px',
                marginRight: '10px',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;