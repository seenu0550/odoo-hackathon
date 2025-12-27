import { mockRequests } from './mockData.js';

let requests = [...mockRequests];

export const api = {
  getRequests: () => Promise.resolve([...requests]),
  
  updateRequest: (id, updates) => {
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index] = { ...requests[index], ...updates };
      return Promise.resolve(requests[index]);
    }
    return Promise.reject(new Error('Request not found'));
  },

  pickupRequest: (id, technician) => {
    return api.updateRequest(id, { 
      assignedTo: technician, 
      status: 'IN_PROGRESS' 
    });
  }
};