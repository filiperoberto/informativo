<template>
  <div v-if="mutatedValue" class="card mb-3">
    <imagem :name='mutatedValue.imagem' :destaque="destaque"/>
    <div class="card-body">
      <div class="card-text">
        <label for="exampleFormControlInput1" class="form-label">Título</label>
        <input
          type="text"
          v-model="mutatedValue.titulo"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Texto</label
        >
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script>
import Imagem from './Imagem.vue';
export default {
  components: { Imagem },
  data() {
    return {
      mutatedValue: null,
    };
  },
  props: {
    modelValue: Object,
    destaque: Boolean
  },
  watch: {
    modelValue() {
      this.mutatedValue = this.modelValue;
    },
  },
  methods: {
    alterar() {
      this.$emit("update:modelValue", this.mutatedValue);
    },
  },
  mounted() {
    this.mutatedValue = this.modelValue;
  },
};
</script>