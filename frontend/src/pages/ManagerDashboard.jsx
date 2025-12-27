import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import EquipmentManagement from '../components/EquipmentManagement';
import TeamManagement from '../components/TeamManagement';
import ScheduleManagement from '../components/ScheduleManagement';
import CalendarView from '../components/CalendarView';
import ReportsAnalytics from '../components/ReportsAnalytics';
import TechnicianManagement from '../components/TechnicianManagement';
import CreateTeamModal from '../components/CreateTeamModal';
import ManagerProfileModal from '../components/ManagerProfileModal';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('equipment');
  const [equipment, setEquipment] = useState([]);
  const [teams, setTeams] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({ name: 'Manager', email: 'admin@company.com' });
  const [showManagerProfile, setShowManagerProfile] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', description: '', members: [] });

  useEffect(() => {
    loadData();
    loadCurrentUser();
  }, []);

  const loadCurrentUser = () => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  };

  const loadData = async () => {
    try {
      const [equipmentData, teamsData, requestsData] = await Promise.all([
        api.getEquipment().catch(() => []),
        api.getTeams().catch(() => []),
        api.getRequests().catch(() => [])
      ]);
      setEquipment(equipmentData || []);
      setTeams(teamsData || []);
      setRequests(requestsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setEquipment([]);
      setTeams([]);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEquipment = async (id) => {
    try {
      await api.deleteEquipment(id);
      setEquipment(equipment.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting equipment:', error);
      alert('Failed to delete equipment. Please try again.');
    }
  };

  const handleCreateTeam = async () => {
    if (!newTeam.name || !newTeam.description) {
      alert('Please fill in team name and description');
      return;
    }
    
    try {
      const createdTeam = await api.createTeam(newTeam);
      setTeams([...teams, createdTeam]);
      setNewTeam({ name: '', description: '', members: [] });
      setShowCreateTeamModal(false);
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: '#f5f7fa',
    display: 'flex',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const sidebarStyle = {
    width: '250px',
    background: '#2c3e50',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    padding: '20px',
    background: '#34495e',
    color: 'white',
    textAlign: 'center',
    borderBottom: '1px solid #3a4a5c'
  };

  const contentCardStyle = {
    background: 'white',
    flex: 1,
    padding: '30px',
    margin: '0'
  };

  const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#bdc3c7',
    borderLeft: '3px solid transparent'
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    background: '#3498db',
    color: 'white',
    borderLeft: '3px solid #2980b9'
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'technicians':
        return <TechnicianManagement buttonStyle={buttonStyle} />;
      case 'equipment':
        return <EquipmentManagement equipment={equipment} loading={loading} onDelete={handleDeleteEquipment} buttonStyle={buttonStyle} />;
      case 'teams':
        return <TeamManagement teams={teams} loading={loading} onCreateTeam={() => setShowCreateTeamModal(true)} buttonStyle={buttonStyle} />;
      case 'schedule':
        return <ScheduleManagement requests={requests} loading={loading} />;
      case 'calendar':
        return <CalendarView requests={requests} />;
      case 'reports':
        return <ReportsAnalytics requests={requests} teams={teams} equipment={equipment} />;
      default:
        return <div><h2>Equipment Management</h2></div>;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Manager Dashboard</h1>
        </div>
        
        <nav style={{ flex: 1, paddingTop: '20px' }}>
          {[
            { id: 'equipment', label: 'Equipment', icon: '🔧' },
            { id: 'technicians', label: 'Technicians', icon: '👨‍🔧' },
            { id: 'teams', label: 'Teams', icon: '👥' },
            { id: 'schedule', label: 'Schedule', icon: '📋' },
            { id: 'calendar', label: 'Calendar', icon: '📅' },
            { id: 'reports', label: 'Reports', icon: '📊' }
          ].map(item => (
            <div
              key={item.id}
              style={activeTab === item.id ? activeNavItemStyle : navItemStyle}
              onClick={() => setActiveTab(item.id)}
            >
              <span style={{ marginRight: '12px', fontSize: '16px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
            </div>
          ))}
        </nav>
        
        <div style={{ padding: '20px', borderTop: '1px solid #3a4a5c' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0',
            color: '#bdc3c7',
            marginBottom: '15px',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.2s ease'
          }}
          onClick={() => setShowManagerProfile(true)}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#3498db',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white'
            }}>{ currentUser.name.charAt(0).toUpperCase() }</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{currentUser.name}</div>
              <div style={{ fontSize: '12px', color: '#95a5a6' }}>{currentUser.email}</div>
            </div>
          </div>
          <button 
            style={buttonStyle}
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <div style={contentCardStyle}>
        {renderContent()}
        
        <CreateTeamModal 
          show={showCreateTeamModal}
          newTeam={newTeam}
          setNewTeam={setNewTeam}
          onClose={() => {
            setShowCreateTeamModal(false);
            setNewTeam({ name: '', description: '', members: [] });
          }}
          onCreate={handleCreateTeam}
          buttonStyle={buttonStyle}
        />
        
        <ManagerProfileModal 
          show={showManagerProfile}
          manager={currentUser}
          onClose={() => setShowManagerProfile(false)}
          buttonStyle={buttonStyle}
        />
      </div>
    </div>
  );
};

export default ManagerDashboard;