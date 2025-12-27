import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './utils/api';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.login(formData);
      
      if (response.success) {
        // Store user data
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        
        // Route based on role
        if (response.user.role === 'manager') {
          navigate('/manager-dashboard');
        } else if (response.user.role === 'technician') {
          navigate('/dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '40px',
      width: '100%',
      maxWidth: '420px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '35px'
    },
    logo: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2d3748',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '16px',
      color: '#718096',
      margin: '0'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '8px'
    },
    input: {
      padding: '14px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff',
      color: '#2d3748'
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    select: {
      padding: '14px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '16px',
      outline: 'none',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    button: {
      padding: '16px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
      marginTop: '10px'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)'
    },
    footer: {
      textAlign: 'center',
      marginTop: '25px',
      fontSize: '13px',
      color: '#a0aec0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>O</div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={(e) => !loading && Object.assign(e.target.style, styles.buttonHover)}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          
          {error && (
            <div style={{
              color: '#e53e3e',
              fontSize: '14px',
              textAlign: 'center',
              marginTop: '10px'
            }}>
              {error}
            </div>
          )}
        </form>
        
        <div style={styles.footer}>
          <button 
            onClick={() => navigate('/register')}
            style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Don't have an account? Register here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;