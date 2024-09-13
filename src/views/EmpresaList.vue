<template>
  <div>
    <h1>Empresas</h1>
    <button @click="showAddEmpresaModal = true">Adicionar Empresa</button>
    <div v-if="showAddEmpresaModal">
      <h2>Adicionar Empresa</h2>
      <form @submit.prevent="addEmpresa">
        <input
          v-model="newEmpresa.NomeFantasia"
          placeholder="Nome Fantasia"
          required
        />
        <input v-model="newEmpresa.CNPJ" placeholder="CNPJ" required />
        <input v-model="newEmpresa.CEP" placeholder="CEP" required />
        <button type="submit">Adicionar</button>
        <button @click="showAddEmpresaModal = false">Cancelar</button>
      </form>
    </div>
    <ul>
      <li v-for="empresa in empresas" :key="empresa.empresaId">
        {{ empresa.nomeFantasia }} - {{ empresa.CNPJ }}
        <button @click="deleteEmpresa(empresa.empresaId)">Deletar</button>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      empresas: [],
      showAddEmpresaModal: false,
      newEmpresa: {
        CNPJ: "",
        NomeFantasia: "",
        CEP: "",
      },
    };
  },
  methods: {
    async fetchEmpresas() {
      try {
        const response = await axios.get("http://localhost:5000/api/empresas");
        this.empresas = response.data;
      } catch (error) {
        console.error(
          "Error fetching empresas:",
          error.response || error.message
        );
      }
    },
    async addEmpresa() {
      console.log(this.newEmpresa);
      try {
        await axios.post("http://localhost:5000/api/empresas", {
          NomeFantasia: this.newEmpresa.NomeFantasia,
          CNPJ: this.newEmpresa.CNPJ,
          CEP: this.newEmpresa.CEP,
          Fornecedores: [],
        });
        this.fetchEmpresas();
        this.showAddEmpresaModal = false;
        // Reset newEmpresa data after adding
        this.newEmpresa = {
          NomeFantasia: "",
          CNPJ: "",
          CEP: "",
          Fornecedores: [],
        };
      } catch (error) {
        console.error(
          "Error adding empresa:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async deleteEmpresa(id) {
      console.log(id)
      if (!id) {
        console.error("Invalid ID");
        return;
      }
      try {
        await axios.delete(`http://localhost:5000/api/empresas/${id}`);
        this.fetchEmpresas();
      } catch (error) {
        console.error(
          "Error deleting empresa:",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
  created() {
    this.fetchEmpresas();
  },
};
</script>
