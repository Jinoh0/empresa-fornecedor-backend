import api from './api';

export default {
  getEmpresas() {
    return api.get('/empresa');
  },
  getEmpresa(id) {
    return api.get(`/empresa/${id}`);
  },
  createEmpresa(data) {
    return api.post('/empresa', data);
  },
  updateEmpresa(id, data) {
    return api.put(`/empresa/${id}`, data);
  },
  deleteEmpresa(id) {
    return api.delete(`/empresa/${id}`);
  },
};
