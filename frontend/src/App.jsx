import React, { useState } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import UserDashboard from './UserDashboard.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  const handleRegister = (userData) => {
    setRegisteredUsers([...registeredUsers, userData]);
    setUser(userData);
  };

  const handleLogin = (loginData) => {
    const registeredUser = registeredUsers.find(u => u.email === loginData.email && u.password === loginData.password);
    if (registeredUser) {
      setUser(registeredUser);
    } else {
      alert('Invalid email or password');
    }
  };

  if (!user) {
    return showRegister ? 
      <Register onRegister={handleRegister} onSwitchToLogin={() => setShowRegister(false)} /> :
      <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />;
  }

  switch (user.role) {
    case 'user':
      return <UserDashboard user={user} />;
    case 'technician':
      return <div>Technician Dashboard (Coming Soon)</div>;
    case 'manager':
      return <div>Manager Dashboard (Coming Soon)</div>;
    default:
      return <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />;
  }
}

export default App;