<template>
  <div class="container mt-2 mb-5">
    <h2>Informações Gerais</h2>
    <div class="d-grid gap-2 col-6 mx-auto mt-2">
      <button class="btn btn-primary" @click="carregarJson" type="button">
        Carregar do Servidor
      </button>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" :class="{'active' : aba === 'escala-pregacao'}" aria-current="page" href="#" @click="aba = 'escala-pregacao'">Escala de Pregações</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{'active' : aba === 'agenda'}" href="#" @click="aba = 'agenda'">Agenda</a>
        </li>
      </ul>
      <template v-if="json.secoes">
        <escala-pregacoes v-model="json.secoes[aba]['escala']" v-if="aba === 'escala-pregacao'"/>
        <agenda v-model="json.secoes[aba]['eventos']" v-if="aba === 'agenda'"/>
      </template>
    </div>
  </div>
</template>
<script>
import { loadGeneral } from "@/services/service";
import EscalaPregacoes from "@/components/EscalaPregacoes";
import Agenda from "@/components/Agenda";

export default {
  components: {
    Agenda,
    EscalaPregacoes,
  },
  data() {
    return {
      json: {},
      saveInterval: null,
      aba: 'escala-pregacao'
    };
  },
  computed: {
  },
  methods: {
    async carregarJson() {
      try {
        const { data } = await loadGeneral();
        this.json = data;
      } catch (e) {
        console.log(e);
      }
    },
    salvarPeriodicamente() {
      clearInterval(this.saveInterval);
      this.saveInterval = setInterval(() => {
        this.$store.dispatch("salvarGeral", this.json);
      }, 5000);
    },
  },
  beforeUnmount() {
    clearInterval(this.saveInterval);
  },
  mounted() {
    this.json = this.$store.state.geral;
    this.salvarPeriodicamente();
  },
};
</script>