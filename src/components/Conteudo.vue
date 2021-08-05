<template>
  <div v-if="mutatedValue" class="card mb-3">
    <div class="card-header text-end" v-if="removivel">
      <button class="btn btn-danger" @click.stop.prevent="$emit('remove')">
        Remover Bloco
      </button>
    </div>

    <div class="position-relative">
      <imagem :name="mutatedValue.imagem" :destaque="destaque" />
      <div class="card-img-overlay">
        <h5 class="card-title">
          <button
            class="btn btn-primary m-2"
            title="Editar Imagem"
            @click.stop.prevent="selecionarImagem"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            class="btn btn-danger m-2"
            title="Remover Imagem"
            @click.stop.prevent="removerImagem"
          >
            <i class="fas fa-times"></i>
          </button>
        </h5>
      </div>
    </div>

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
      default: false,
    },
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
    removerImagem() {
      this.mutatedValue.imagem = ""
      this.$emit("update:modelValue", this.mutatedValue);
    },
    async selecionarImagem() {
      try {
        this.mutatedValue.imagem = await this.$store.dispatch(
          "openSelectImage",
          {
            dir: this.destaque ? "destaques" : "avisos",
            selected: this.mutatedValue.imagem 
          }
        );
        this.$emit("update:modelValue", this.mutatedValue);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.mutatedValue = this.modelValue;
  },
};
</script>