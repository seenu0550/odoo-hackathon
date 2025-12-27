import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import RequestsTab from './components/RequestsTab.jsx';
import EquipmentTab from './components/EquipmentTab.jsx';

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('requests');
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'User', email: 'user@company.com', role: 'employee' });
  const [requests, setRequests] = useState([]);
  
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    loadCurrentUser();
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [equipmentData, requestsData] = await Promise.all([
        api.getEquipment().catch(() => []),
        api.getRequests().catch(() => [])
      ]);
      setEquipment(equipmentData || []);
      setRequests(requestsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadCurrentUser = () => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

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
      <Header user={currentUser} onUserClick={() => setShowUserModal(true)} />
      
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
            <p style={{ margin: '10px 0', fontSize: '16px', color: '#4a5568' }}>Name: {currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}</p>
            <p style={{ margin: '10px 0', fontSize: '16px', color: '#4a5568' }}>Role: {currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1) || 'Employee'}</p>
            <p style={{ margin: '10px 0', fontSize: '16px', color: '#4a5568' }}>Email: {currentUser?.email || 'N/A'}</p>
            <p style={{ margin: '10px 0', fontSize: '16px', color: '#4a5568' }}>Department: {currentUser?.department || 'Not specified'}</p>
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
              onClick={handleLogout}
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