import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ user, onUserClick }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/');
  };
  
  const styles = {
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '25px 40px',
      marginBottom: '25px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2d3748',
      margin: '0'
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      marginLeft: '12px'
    }
  };

  return (
    <div style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h1 style={styles.title}>GearGuard Dashboard</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span 
          style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#2d3748',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease'
          }}
          onClick={onUserClick}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f7fafc'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          {user?.name || user?.email?.split('@')[0] || 'User'}
        </span>
        <button 
          onClick={handleLogout}
          style={styles.button}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;