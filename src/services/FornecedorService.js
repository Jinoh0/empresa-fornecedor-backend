import api from './api';

export default {
  getFornecedores(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return api.get(`/fornecedor?${query}`);
  },
  getFornecedor(id) {
    return api.get(`/fornecedor/${id}`);
  },
  createFornecedor(data) {
    return api.post('/fornecedor', data);
  },
  updateFornecedor(id, data) {
    return api.put(`/fornecedor/${id}`, data);
  },
  deleteFornecedor(id) {
    return api.delete(`/fornecedor/${id}`);
  },
};
