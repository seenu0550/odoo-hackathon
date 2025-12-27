import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('equipment');
  const [equipment, setEquipment] = useState([
    { id: 1, name: 'Conveyor Belt A1', category: 'Production', team: 'Mechanical', location: 'Floor 1', status: 'Active' },
    { id: 2, name: 'Hydraulic Press B2', category: 'Manufacturing', team: 'Hydraulics', location: 'Floor 2', status: 'Active' },
    { id: 3, name: 'CNC Machine C3', category: 'Production', team: 'Electronics', location: 'Floor 1', status: 'Maintenance' }
  ]);

  const [teams] = useState([
    { id: 1, name: 'Mechanical Team', lead: 'John Smith', members: 5, activeProjects: 3 },
    { id: 2, name: 'Hydraulics Team', lead: 'Sarah Johnson', members: 4, activeProjects: 2 },
    { id: 3, name: 'Electronics Team', lead: 'Mike Wilson', members: 6, activeProjects: 4 }
  ]);

  const [schedules] = useState([
    { id: 1, equipment: 'Conveyor Belt A1', type: 'Maintenance', date: '2025-01-15', technician: 'John Smith' },
    { id: 2, equipment: 'Hydraulic Press B2', type: 'Inspection', date: '2025-01-18', technician: 'Sarah Johnson' },
    { id: 3, equipment: 'CNC Machine C3', type: 'Repair', date: '2025-01-20', technician: 'Mike Wilson' }
  ]);

  const [reports] = useState([
    { id: 1, title: 'Monthly Equipment Report', type: 'Equipment', date: '2025-01-01', status: 'Completed' },
    { id: 2, title: 'Team Performance Analysis', type: 'Performance', date: '2025-01-05', status: 'In Progress' },
    { id: 3, title: 'Maintenance Cost Report', type: 'Financial', date: '2025-01-10', status: 'Pending' }
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddEquipment = () => {
    const newEquipment = {
      id: equipment.length + 1,
      name: `New Equipment ${equipment.length + 1}`,
      category: 'Production',
      team: 'Mechanical',
      location: 'Floor 1',
      status: 'Active'
    };
    setEquipment([...equipment, newEquipment]);
  };

  const handleEditEquipment = (id) => {
    alert(`Edit equipment with ID: ${id}`);
  };

  const handleDeleteEquipment = (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      setEquipment(equipment.filter(item => item.id !== id));
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    display: 'flex',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const sidebarStyle = {
    width: '280px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '0 20px 20px 0',
    margin: '20px 0 20px 20px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const headerStyle = {
    padding: '30px 25px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px 20px 0 0',
    color: 'white',
    textAlign: 'center'
  };

  const mainContentStyle = {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  };

  const topBarStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '20px 30px',
    marginBottom: '20px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const contentCardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    flex: 1
  };

  const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '12px',
    margin: '5px 15px'
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
  };

  const buttonStyle = {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'equipment':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', margin: 0 }}>Equipment Management</h2>
              <button style={buttonStyle} onClick={handleAddEquipment}>+ Add Equipment</button>
            </div>
            
            <table style={tableStyle}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Equipment Name</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Category</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Team</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Location</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.name}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.category}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.team}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{item.location}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: item.status === 'Active' ? '#c6f6d5' : '#fed7d7',
                        color: item.status === 'Active' ? '#22543d' : '#c53030'
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          style={{ backgroundColor: '#667eea', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}
                          onClick={() => handleEditEquipment(item.id)}
                        >
                          Edit
                        </button>
                        <button 
                          style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}
                          onClick={() => handleDeleteEquipment(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'teams':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', margin: 0 }}>Teams Management</h2>
              <button style={buttonStyle}>+ Add Team</button>
            </div>
            
            <table style={tableStyle}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Team Name</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Team Lead</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Members</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Active Projects</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map(team => (
                  <tr key={team.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{team.name}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{team.lead}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{team.members}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{team.activeProjects}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ backgroundColor: '#667eea', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                        <button style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'schedule':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', margin: 0 }}>Schedule Management</h2>
              <button style={buttonStyle}>+ Add Schedule</button>
            </div>
            
            <table style={tableStyle}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Equipment</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Type</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Date</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Technician</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map(schedule => (
                  <tr key={schedule.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{schedule.equipment}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{schedule.type}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{schedule.date}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{schedule.technician}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ backgroundColor: '#667eea', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                        <button style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'calendar':
        return (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', marginBottom: '30px' }}>Calendar View</h2>
            
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{ padding: '10px', textAlign: 'center', fontWeight: '600', color: '#4a5568' }}>{day}</div>
                ))}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} style={{
                    padding: '15px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    minHeight: '60px',
                    backgroundColor: i % 7 === 0 || i % 7 === 6 ? '#f8fafc' : 'white'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#2d3748' }}>{i + 1}</div>
                    {i === 14 && <div style={{ fontSize: '10px', backgroundColor: '#667eea', color: 'white', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>Maintenance</div>}
                    {i === 17 && <div style={{ fontSize: '10px', backgroundColor: '#38a169', color: 'white', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>Inspection</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#2d3748', margin: 0 }}>Reports & Analytics</h2>
              <button style={buttonStyle}>+ Generate Report</button>
            </div>
            
            <table style={tableStyle}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Report Title</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Type</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Date</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4a5568' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(report => (
                  <tr key={report.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{report.title}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{report.type}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#2d3748' }}>{report.date}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: report.status === 'Completed' ? '#c6f6d5' : report.status === 'In Progress' ? '#feebc8' : '#fed7d7',
                        color: report.status === 'Completed' ? '#22543d' : report.status === 'In Progress' ? '#dd6b20' : '#c53030'
                      }}>
                        {report.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ backgroundColor: '#667eea', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>View</button>
                        <button style={{ backgroundColor: '#38a169', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>Download</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'equipment': return 'Equipment Management';
      case 'teams': return 'Teams Management';
      case 'schedule': return 'Schedule Management';
      case 'calendar': return 'Calendar View';
      case 'reports': return 'Reports & Analytics';
      default: return 'Equipment Management';
    }
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>O</div>
          <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Manager Dashboard</h1>
        </div>
        
        <nav style={{ padding: '20px 0' }}>
          {[
            { id: 'equipment', label: 'Equipment', icon: '🔧' },
            { id: 'teams', label: 'Teams', icon: '👥' },
            { id: 'schedule', label: 'Schedule', icon: '📋' },
            { id: 'calendar', label: 'Calendar', icon: '📅' },
            { id: 'reports', label: 'Reports', icon: '📊' }
          ].map(item => (
            <div
              key={item.id}
              style={activeTab === item.id ? activeNavItemStyle : { ...navItemStyle, color: '#4a5568' }}
              onClick={() => setActiveTab(item.id)}
            >
              <span style={{ marginRight: '12px', fontSize: '16px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Top Bar */}
        <div style={topBarStyle}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#2d3748', margin: 0 }}>{getPageTitle()}</h1>
          <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </div>
        
        {/* Content Card */}
        <div style={contentCardStyle}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;