<template>
  <div id="app">
    <overlay />
    <navbar/>
    <component v-bind:is="currentComponent"></component>
    <toast />
  </div>
</template>

<script>
import Principal from "./view/Principal";
import Geral from "./view/Geral";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./view/Login";
import { mapGetters, mapState } from "vuex";
import Toast from "./components/Toast";
import Overlay from "./components/Overlay";
import Navbar from "./components/Navbar";
import EnviosVue from './view/Envios.vue';

const rotas = {
  edicao: Principal,
  geral: Geral,
  envios: EnviosVue
};

export default {
  name: "App",
  components: {
    Toast,
    Overlay,
    Navbar
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["tokenIsValid"]),
    ...mapState(["rota"]),
    currentComponent() {
      return this.tokenIsValid ? rotas[this.rota] : Login;
    },
  },
  mounted() {
    this.$store.dispatch("overlay", false);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const dev = urlSearchParams.get('dev');

    this.$store.dispatch('dev', !!dev)
  },
};
</script>
