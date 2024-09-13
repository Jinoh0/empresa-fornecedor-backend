import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import EmpresaList from '../views/EmpresaList.vue';
import FornecedorList from '../views/FornecedorList.vue';

const routes = [
  // { path: '/', component: Home },
  { path: '/empresas', component: EmpresaList },
  { path: '/fornecedores', component: FornecedorList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
