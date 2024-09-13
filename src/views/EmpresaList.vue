<template>
  <div>
    <h1>Empresas</h1>
    <button @click="showAddEmpresaModal = true">Adicionar Empresa</button>
    <div v-if="showAddEmpresaModal">
      <h2>Adicionar Empresa</h2>
      <form @submit.prevent="addEmpresa">
        <input v-model="newEmpresa.nomeFantasia" placeholder="Nome Fantasia" required />
        <input v-model="newEmpresa.cnpj" placeholder="CNPJ" required />
        <input v-model="newEmpresa.cep" placeholder="CEP" required />
        <button type="submit">Adicionar</button>
        <button @click="showAddEmpresaModal = false">Cancelar</button>
      </form>
    </div>
    <ul>
      <li v-for="empresa in empresas" :key="empresa.id">
        {{ empresa.nomeFantasia }} - {{ empresa.cnpj }}
        <button @click="deleteEmpresa(empresa.id)">Deletar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      empresas: [],
      showAddEmpresaModal: false,
      newEmpresa: {
        nomeFantasia: '',
        cnpj: '',
        cep: ''
      }
    };
  },
  methods: {
    async fetchEmpresas() {
      try {
        const response = await axios.get('http://localhost:5000/api/empresa');
        this.empresas = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addEmpresa() {
      try {
        await axios.post('http://localhost:5000/api/empresa', this.newEmpresa);
        this.fetchEmpresas();
        this.showAddEmpresaModal = false;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEmpresa(id) {
      try {
        await axios.delete(`http://localhost:5000/api/empresa/${id}`);
        this.fetchEmpresas();
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    this.fetchEmpresas();
  }
};
</script>
