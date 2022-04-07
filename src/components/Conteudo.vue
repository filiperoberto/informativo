<template>
  <div v-if="mutatedValue" class="card mb-3" :class="{'border-success': dir === 'destaques'}">
    <div class="card-header d-flex justify-content-between align-items-center" v-if="removivel">
      <span v-if="dir === 'destaques'" class='badge bg-success'>Destaque</span>
      <button class="btn btn-danger" @click.stop.prevent="$emit('remove')">
        Remover Bloco
      </button>
        <div>
          <button class="btn btn-secondary mr-2" @click.stop.prevent="$emit('up')" :disabled="dir === 'destaques'">
            <i class="fas fa-arrow-up"></i>
          </button>
          <button class="btn btn-secondary" @click.stop.prevent="$emit('down')" :disabled="ultimo">
            <i class="fas fa-arrow-down"></i>
          </button>

        </div>
    </div>

    <div class="position-relative">
      <imagem :name="mutatedValue.imagem" :dir="dir" />
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
        <label :for="`formTitulo-${uid}`" class="form-label">Título</label>
        <input
          type="text"
          v-model="mutatedValue.titulo"
          class="form-control"
          :id="`formTitulo-${uid}`"
        />
      </div>
      <div class="card-text" v-if='mutatedValue.hasOwnProperty("autor")'>
        <label :for="`formAutor-${uid}`" class="form-label">Autor</label>
        <input
          type="text"
          v-model="mutatedValue.autor"
          class="form-control"
          :id="`formAutor-${uid}`"
        />
      </div>
      <div class="card-text" v-if='mutatedValue.hasOwnProperty("editora")'>
        <label :for="`formEditora-${uid}`" class="form-label">Editora</label>
        <input
          type="text"
          v-model="mutatedValue.editora"
          class="form-control"
          :id="`formEditora-${uid}`"
        />
      </div>
      <div class="card-text" v-if='mutatedValue.hasOwnProperty("paginas")'>
        <label :for="`formPagina-${uid}`" class="form-label">Páginas</label>
        <input
          type="number"
          v-model.number="mutatedValue.paginas"
          class="form-control"
          :id="`formPagina-${uid}`"
        />
      </div>
      <div class="card-text" v-if='mutatedValue.hasOwnProperty("url")'>
        <label :for="`formUrl-${uid}`" class="form-label">Url</label>
        <input
          type="text"
          v-model="mutatedValue.url"
          class="form-control"
          :id="`formUrl-${uid}`"
        />
      </div>
      <div class="mb-3">
        <label class="form-label"
          >Texto</label
        >
        <text-editor v-model="mutatedValue.texto" @change="alterar" v-if='mutatedValue.hasOwnProperty("texto")'/>
        <text-editor v-model="mutatedValue.descricao" @change="alterar" v-if='mutatedValue.hasOwnProperty("descricao")'/>
      </div>
    </div>
  </div>
</template>
<script>
import Imagem from "./Imagem.vue";
import TextEditor from "./TextEditor.vue";
import { getCurrentInstance } from 'vue'
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
    dir: null,
    ultimo: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const uid = getCurrentInstance().uid

    return {
      uid
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
    removerImagem() {
      this.mutatedValue.imagem = ""
      this.$emit("update:modelValue", this.mutatedValue);
    },
    async selecionarImagem() {
      try {
        this.mutatedValue.imagem = await this.$store.dispatch(
          "openSelectImage",
          {
            dir: this.dir,
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
<style scoped>
.mr-2 {
  margin-right: 2px;
}
</style>