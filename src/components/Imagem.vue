<template>
  <span>
    <img v-if="name && !erro && !loading" :src="url" class="card-img-top" />
    <div v-if='erro' class="card-img-top text-center no-imagem">
      <i class="far fa-frown-open"></i>
      <div>Imagem não encontrada</div>
    </div>
    <div v-if='loading' class="card-img-top text-center no-imagem">
      <i class="fas fa-spinner fa-spin"></i>
      <div>Carregando..</div>
    </div>
  </span>
</template>
<script>
export default {
  props: {
    dir: {
      type: String,
      default: null,
    },
    name: String,
  },
  computed: {
    url() {
      return `${process.env.VUE_APP_ENDERECO_PHP}/imagens/${this.dir}/${this.name}`;
    },
  },
  watch: {
    name() {
      this.testImage()
    }
  },
  data() {
    return {
      erro: false,
      loading: false
    };
  },
  methods: {
    testImage() {
      let tester = new Image();
      tester.onload = () => {
        this.erro = false;
        this.loading = false
      };
      tester.onerror = () => {
        this.erro = true;
        this.loading = false
      };
      this.loading = true
      tester.src = this.url;
    },
  },
  mounted() {
    this.testImage()
  }
};
</script>
<style scoped>
.no-imagem {
  padding: 20px;
  background: #ddd;
}
</style>