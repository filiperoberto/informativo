<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Configuração Seções</h5>
    </div>
    <div class="card-body">
      <div class="mt-3" v-for='(secao, index) in valores' :key='index'>
        <label :for="`secao-informativo-${index}`" class="form-label">Título {{secao.titulo}}</label>
        <input
          type="text"
          v-model="secao.valor.titulo"
          class="form-control"
          @change="enviarDados()"
          :id="`secao-informativo-${index}`"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    modelValue(newValue) {
      this.mutableValue = newValue
    }
  },
  data() {
    return {
      mutableValue: {}
    }
  },
  computed: {
    valores() {
      return Object.keys(this.mutableValue).map(chave => {
        return { chave, valor: this.mutableValue[chave], titulo: chave.split("-").join(" ") }
      });
    },
  },
  methods: {
    enviarDados() {
      this.$emit("update:modelValue", this.mutableValue)
    },
  },
  mounted() {
    this.mutableValue = this.modelValue
  }
};
</script>