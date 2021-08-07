<template>
  <div id="app">
    <overlay/>
    <nav class="navbar navbar-light bg-light nav-pills">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img
            src="https://ibrvn.com.br/wp-content/uploads/2016/02/icon.png"
            alt=""
            width="30"
            height="24"
          />
          Informativo IBRVN
        </a>
        <template v-if="tokenIsValid">
          <span class="nav-item">
            <a
              class="nav-link"
              href="#"
              :class="{ active: rota === 'edicao' }"
              aria-current="page"
              @click="$store.dispatch('navigate', 'edicao')"
              >Edição Atual</a
            >
          </span>
          <span class="nav-item">
            <a
              class="nav-link"
              href="#"
              :class="{ active: rota === 'geral' }"
              @click="$store.dispatch('navigate', 'geral')"
              >Geral</a
            >
          </span>
          <button
            class="navbar-toggler"
            type="button"
            @click.stop.prevent="$store.dispatch('logout')"
          >
            Logout
          </button>
        </template>
      </div>
    </nav>
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

const rotas = {
  edicao: Principal,
  geral: Geral,
};

export default {
  name: "App",
  components: {
    Toast,
    Overlay
  },
  data() {},
  computed: {
    ...mapGetters(["tokenIsValid"]),
    ...mapState(["rota"]),
    currentComponent() {
      return this.tokenIsValid ? rotas[this.rota] : Login;
    },
  },
  mounted() {
    this.$store.dispatch('overlay', false)
  }
};
</script>
