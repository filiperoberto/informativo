<template>
  <div v-if="mutatedValue" class="card mb-3">
    <div class="card-header text-end" v-if='removivel'>
      <button class="btn btn-danger" @click.stop.prevent="$emit('remove')">Remover Bloco</button>
    </div>
    <imagem :name="mutatedValue.imagem" :destaque="destaque" />
    <div class="card-body">
      <div class="card-text">
        <label for="exampleFormControlInput1" class="form-label">Título</label>
        <input
          type="text"
          v-model="mutatedValue.titulo"
          class="form-control"
          id="exampleFormControlInput1"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Texto</label
        >
        <text-editor v-model="mutatedValue.texto" @change="alterar" />
      </div>
    </div>
  </div>
</template>
<script>
import Imagem from "./Imagem.vue";
import TextEditor from "./TextEditor.vue";
export default {
  components: { Imagem, TextEditor },
  data() {
    return {
      mutatedValue: null,
    };
  },
  props: {
    modelValue: Object,
    destaque: Boolean,
    removivel: {
      type: Boolean,
      default: false
    }
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