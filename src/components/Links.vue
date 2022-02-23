<template>
  <div
    class="row mt-2"
    v-for="(link, index) in mutableValue"
    :key="`link-${index}`"
  >
    <div class="col-md-5">
      <input
        type="text"
        class="form-control"
        :id="`rotuloLink-${index}`"
        placeholder="Título"
        @change='atualizarValores()'
        v-model="link.titulo"
      />
    </div>
    <div class="col-md-6">
      <input
        type="url"
        class="form-control"
        placeholder="Url"
        @change='atualizarValores()'
        :id="`link-${index}`"
        v-model="link.url"
      />
    </div>
    <div class="col-md-1">
      <button class="btn btn-small btn-danger" @click="remover(index)">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
  <div class="d-grid gap-2 mt-3">
    <button class="btn btn-block btn-primary" @click="adicionarLink">
      <i class="fas fa-plus"></i> Adicionar Link
    </button>
  </div>
</template>
<script>
export default {
  emits:['change','update:modelValue'],
  props: {
    modelValue: {
      type: Object || Array,
      default: () => {},
    },
  },
  data() {
    return {
      mutableValue: {},
    };
  },
  watch: {
    modelValue() {
      this.carregaModelValue();
    },
  },
  methods: {
    remover(index) {
      this.mutableValue.splice(index, 1);

      this.atualizarValores()
    },
    atualizarValores() {
      this.$emit("update:modelValue", this.mutableValue);
      this.$emit("change", this.mutableValue);
    },
    carregaModelValue() {
      if (typeof this.modelValue === "object") {
        this.mutableValue = Object.keys(this.modelValue).map(
          (key) => this.modelValue[key]
        );
      } else {
        this.mutableValue = this.modelValue;
      }
    },
    adicionarLink() {
      this.mutableValue.push({ titulo: null, url: null });
    },
  },
  mounted() {
    this.carregaModelValue();
  },
};
</script>