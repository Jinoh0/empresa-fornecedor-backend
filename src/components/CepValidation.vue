<template>
    <div>
      <input v-model="cep" @blur="validateCep" placeholder="CEP" />
      <p v-if="cepInvalido">CEP inválido.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        cep: '',
        cepInvalido: false
      };
    },
    methods: {
      async validateCep() {
        try {
          const response = await axios.get(`http://cep.la/api/${this.cep}`);
          if (response.status === 200) {
            this.cepInvalido = false;
          } else {
            this.cepInvalido = true;
          }
        } catch (error) {
          this.cepInvalido = true;
        }
      }
    }
  };
  </script>
  