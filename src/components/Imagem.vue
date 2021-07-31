<template>
  <span>
    <img v-if="name && !erro" :src="url" class="card-img-top" />
  </span>
</template>
<script>
export default {
  props: {
    destaque: {
      type: Boolean,
      default: false,
    },
    name: String,
  },
  computed: {
    url() {
      let path = "avisos";
      if (this.destaque) {
        path = "destaques";
      }
      return `http://informativo.ibrvn.com.br/imagens/${path}/${this.name}`;
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
    };
  },
  methods: {
    testImage() {
      let tester = new Image();
      tester.onload = () => {
        this.erro = false;
      };
      tester.onerror = () => {
        this.erro = true;
      };
      tester.src = this.url;
    },
  },
  mounted() {
    this.testImage()
  }
};
</script>