<template>
  <div>
    <h1>Fornecedores</h1>
    <button @click="showAddFornecedorModal = true">Adicionar Fornecedor</button>
    <div v-if="showAddFornecedorModal">
      <h2>Adicionar Fornecedor</h2>
      <form @submit.prevent="addFornecedor">
        <input v-model="newFornecedor.nome" placeholder="Nome" required />
        <input
          v-model="newFornecedor.cpfCnpj"
          placeholder="CPF/CNPJ"
          required
        />
        <input v-model="newFornecedor.email" placeholder="Email" required />
        <input v-model="newFornecedor.cep" placeholder="CEP" required />
        <input
          v-if="isPessoaFisica"
          v-model="newFornecedor.rg"
          placeholder="RG"
        />
        <input
          v-if="isPessoaFisica"
          v-model="newFornecedor.dataNascimento"
          placeholder="Data de Nascimento"
        />
        <button type="submit">Adicionar</button>
        <button @click="showAddFornecedorModal = false">Cancelar</button>
      </form>
    </div>
    <div>
      <input v-model="filterNome" placeholder="Filtrar por Nome" />
      <input v-model="filterCpfCnpj" placeholder="Filtrar por CPF/CNPJ" />
    </div>
    <ul>
      <li v-for="fornecedor in filteredFornecedores" :key="fornecedor.id">
        {{ fornecedor.nome }} - {{ fornecedor.cpfCnpj }}
        <button @click="deleteFornecedor(fornecedor.id)">Deletar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fornecedores: [],
      showAddFornecedorModal: false,
      newFornecedor: {
        nome: "",
        cpfCnpj: "",
        email: "",
        cep: "",
        rg: "",
        dataNascimento: "",
      },
      filterNome: "",
      filterCpfCnpj: "",
    };
  },
  computed: {
    isPessoaFisica() {
      // Adicione a lógica para determinar se é Pessoa Física
      return this.newFornecedor.cpfCnpj.length === 11; // Exemplo simplificado
    },
    filteredFornecedores() {
      return this.fornecedores.filter(
        (fornecedor) =>
          fornecedor.nome.includes(this.filterNome) ||
          fornecedor.cpfCnpj.includes(this.filterCpfCnpj)
      );
    },
  },
  methods: {
    async fetchFornecedores() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fornecedor"
        );
        this.fornecedores = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addFornecedor() {
      try {
        if (this.isPessoaFisica && !this.isMaiorDeIdade()) {
          alert("Fornecedor pessoa física menor de idade não permitido.");
          return;
        }
        await axios.post(
          "http://localhost:5000/api/fornecedor",
          this.newFornecedor
        );
        this.fetchFornecedores();
        this.showAddFornecedorModal = false;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFornecedor(id) {
      try {
        await axios.delete(`http://localhost:5000/api/fornecedor/${id}`);
        this.fetchFornecedores();
      } catch (error) {
        console.error(error);
      }
    },
    isMaiorDeIdade() {
      const dataNascimento = new Date(this.newFornecedor.dataNascimento);
      const hoje = new Date();
      let idade = hoje.getFullYear() - dataNascimento.getFullYear();
      const m = hoje.getMonth() - dataNascimento.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
      }
      return idade >= 18;
    },
  },
  created() {
    this.fetchFornecedores();
  },
};
</script>
