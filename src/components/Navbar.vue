<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
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
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          @click.stop.prevent="collapsed = !collapsed"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02" :class="{'show' : !collapsed}">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                :class="{ active: rota === 'edicao' }"
                aria-current="page"
                @click="$store.dispatch('navigate', 'edicao')"
                >Edição Atual</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                :class="{ active: rota === 'geral' }"
                @click="$store.dispatch('navigate', 'geral')"
                >Geral</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
                :class="{ active: rota === 'envios' }"
                @click="$store.dispatch('navigate', 'envios')"
                >Envios</a
              >
            </li>
          </ul>
          <form class="d-flex">
            <button
              class="btn btn-outline-danger btn-sm"
              @click.stop.prevent="$store.dispatch('logout')"
            >
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </form>
        </div>
      </template>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["tokenIsValid"]),
    ...mapState(["rota"]),
  },
  data() {
    return {
      collapsed: true
    }
  },
};
</script>