import React from 'react';

function Header({ user, onUserClick }) {
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
    }
  };

  return (
    <div style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h1 style={styles.title}>GearGuard Dashboard</h1>
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default Header;