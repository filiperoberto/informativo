<template>
  <div id="app">
    <component v-bind:is="currentComponent"></component>
  </div>
</template>

<script>
import Principal from './view/Principal.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './view/Login.vue';
import NotFound from './view/NotFound.vue';

const routes = {
  '/': Principal,
  '/login': Login
}

export default {
  name: 'App',
  data() {
    return {
      currentRoute: window.location.pathname
    }
  },
  computed: {
    currentComponent() {
      return routes[this.currentRoute] || NotFound
    }
  }
}
</script>
