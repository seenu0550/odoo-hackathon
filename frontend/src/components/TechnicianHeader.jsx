import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Technician', email: 'tech@company.com', role: 'technician' });
  const navigate = useNavigate();
  
  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = () => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <header style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
      borderBottom: '1px solid #e5e7eb' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Technician Dashboard</h1>
          </div>
          
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px'
              }}
              title={`${currentUser.name} - ${currentUser.department || 'Technician'}`}
            >
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                minWidth: '250px',
                zIndex: 10
              }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>{currentUser.name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>ID: {currentUser._id || 'N/A'}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{currentUser.department || 'Not specified'}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Role: {currentUser.role}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{currentUser.email}</div>
                </div>
                
                <div style={{ padding: '8px 0' }}>
                  <button 
                    onClick={() => alert('Statistics feature coming soon!')}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      textAlign: 'left',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    📊 My Statistics
                  </button>
                  <button 
                    onClick={() => alert('Settings feature coming soon!')}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      textAlign: 'left',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ⚙️ Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      textAlign: 'left',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;