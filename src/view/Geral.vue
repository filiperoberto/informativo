<template>
  <div class="container mt-2 mb-5">
    <h2>Informações Gerais</h2>
    <div class="d-grid gap-2 col-6 mx-auto mt-2">
      <button class="btn btn-primary" @click="carregarJson" type="button">Carregar do Servidor</button>
      <template v-if='json.secoes'>
        <escala-pregacoes :escala="json.secoes['escala-pregacao']"/>
      </template>
    </div>
  </div>
</template>
<script>
import { loadGeneral } from "@/services/service";
import EscalaPregacoes from "@/components/EscalaPregacoes"
export default {
  components: {
    EscalaPregacoes
  },
  data() {
    return {
      json: {},
      saveInterval: null
    }
  },
  methods: {
    async carregarJson() {
      try {
        const { data } = await loadGeneral()
        this.json = data
      } catch(e) {
        console.log(e)
      }
    },
    salvarPeriodicamente() {
      clearInterval(this.saveInterval)
      this.saveInterval = setInterval(() => {
        this.$store.dispatch('salvarGeral', this.json)
      },5000)
    },
  },
  beforeUnmount() {
    clearInterval(this.saveInterval)
  },
  mounted() {
    this.json = this.$store.state.geral
    this.salvarPeriodicamente()
  }
};
</script>