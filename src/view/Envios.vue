<template>
  <div class="container">
    <div v-if="envios.length" class="text-center">
      <h1>Enviando Emails</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Membro</th>
            <th scope="col">Erro</th>
            <th scope="col">Tentativas</th>
            <th scope="col">Edição</th>
            <th scope="col">Enviado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="envio in envios" :key="envio.id">
            <th scope="row">{{ envio.id }}</th>
            <td>{{ envio.nome }}</td>
            <td>{{ envio.erro_envio }}</td>
            <td>{{ envio.tentativas }}</td>
            <td>{{ envio.edicao }}</td>
            <td>
              <span
                v-if="envio.data_envio"
                class="badge badge-pill bg-success"
              >
                <i class="fas fa-check"></i>
              </span>
              <span v-else class="badge badge-pill bg-default text-dark">
                <i class="fas fa-circle-notch fa-spin fa-2x fa-fw"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <paginacao
        class="d-flex justify-content-center"
        :limit="limit"
        :page="page"
        @changepage="consultaEnvios($event)"
        :count="count"
      ></paginacao>
    </div>
    <div class="text-center" v-else-if="!envios.length && consultado">
      <h1>Todos Emails Enviados!</h1>
    </div>
    <div v-else class="text-center">
      <h1>Carregando...</h1>
    </div>
  </div>
</template>
<script>
import { envios } from "@/services/service";
import Paginacao from '../components/Paginacao.vue';
export default {
  components: { Paginacao },
  data() {
    return {
      envios: [],
      interval: undefined,
      consultado: false,
      count: 0,
      limit: 20,
      page: 0,
    };
  },

  mounted() {
    this.consultaEnvios();

    this.interval = setInterval(() => {
      this.consultaEnvios(this.page);
    }, 20000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },

  methods: {
    async consultaEnvios(page) {
      this.page = page || 0;
      let offset = this.page * this.limit;

      try {
        const { data } = await envios(this.limit, offset);
        this.envios = data.content;
        this.consultado = true;
        this.count = data.count;
      } catch ({ response }) {
        this.$store.dispatch("alert", {
          message: ((response || {}).data || {}).msg,
          showing: true,
          type: "erro",
        });
      }
    },
  },
};
</script>