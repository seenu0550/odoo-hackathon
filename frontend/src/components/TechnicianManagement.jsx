import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import TechnicianProfileModal from './TechnicianProfileModal';

const TechnicianManagement = ({ buttonStyle }) => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newTechnician, setNewTechnician] = useState({
    name: '',
    email: '',
    password: '',
    department: ''
  });

  useEffect(() => {
    loadTechnicians();
  }, []);

  const loadTechnicians = async () => {
    try {
      const users = await api.getUsers();
      const technicianUsers = users.filter(user => user.role === 'technician');
      console.log('Loaded technicians:', technicianUsers);
      setTechnicians(technicianUsers);
    } catch (error) {
      console.error('Error loading technicians:', error);
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (technician) => {
    setSelectedTechnician(technician);
    setShowProfileModal(true);
  };

  const handleAddTechnician = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!newTechnician.name || !newTechnician.email || !newTechnician.password || !newTechnician.department) {
      alert('Please fill in all fields');
      return;
    }

    try {
      console.log('Attempting to register technician:', newTechnician);
      const response = await api.register({
        ...newTechnician,
        role: 'technician'
      });
      console.log('Registration response:', response);
      setNewTechnician({ name: '', email: '', password: '', department: '' });
      setShowAddForm(false);
      await loadTechnicians();
    } catch (error) {
      console.error('Error adding technician:', error);
      alert('Failed to add technician: ' + (error.message || 'Please try again.'));
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', margin: 0 }}>Technician Management</h2>
        <button 
          style={buttonStyle}
          onClick={() => setShowAddForm(true)}
        >
          + Add Technician
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTechnician} style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Add New Technician</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Name"
              value={newTechnician.name}
              onChange={(e) => setNewTechnician({...newTechnician, name: e.target.value})}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newTechnician.email}
              onChange={(e) => setNewTechnician({...newTechnician, email: e.target.value})}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input
              type="password"
              placeholder="Password"
              value={newTechnician.password}
              onChange={(e) => setNewTechnician({...newTechnician, password: e.target.value})}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            />
            <select
              value={newTechnician.department}
              onChange={(e) => setNewTechnician({...newTechnician, department: e.target.value})}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            >
              <option value="">Select Department</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="HVAC">HVAC</option>
              <option value="Plumbing">Plumbing</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={buttonStyle}>
              Add Technician
            </button>
            <button 
              type="button"
              style={{...buttonStyle, background: '#6c757d'}}
              onClick={(e) => {
                e.preventDefault();
                setShowAddForm(false);
                setNewTechnician({ name: '', email: '', password: '', department: '' });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {technicians.length > 0 ? technicians.map(technician => (
          <div key={technician._id} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onClick={() => handleViewProfile(technician)}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#3498db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {technician.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', margin: 0 }}>
                  {technician.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
                  {technician.email}
                </p>
                {technician.department && (
                  <p style={{ fontSize: '12px', color: '#3498db', margin: 0, fontWeight: '500' }}>
                    {technician.department}
                  </p>
                )}
              </div>
            </div>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#e6f3ff',
              color: '#3498db',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Technician
            </div>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: '50px', color: '#718096' }}>
            No technicians found
          </div>
        )}
      </div>
      
      <TechnicianProfileModal 
        show={showProfileModal}
        technician={selectedTechnician}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedTechnician(null);
        }}
        buttonStyle={buttonStyle}
      />
    </div>
  );
};

export default TechnicianManagement;