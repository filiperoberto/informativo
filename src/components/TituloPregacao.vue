<template>
  <div>
    <div class="mb-3">
      <label :for="`titulo-${uid}`" class="form-label">Título</label>
      <input
        type="text"
        class="form-control"
        :id="`titulo-${uid}`"
        v-model="titulo"
        @change="alterar"
      />
    </div>
    <div class="mb-3">
      <label :for="`titulo-${uid}`" class="form-label">Url Áudio Última Pregação</label>
      <input
        type="text"
        class="form-control"
        :id="`titulo-${uid}`"
        v-model="url"
        @change="alterar"
      />
    </div>
  </div>
</template>
<script>
import { getCurrentInstance } from 'vue'
export default {
  props: {
    modelValue: Object,
  },
  data() {
    return {
      titulo: null,
      url: null
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
      this.extrairValores()
    }
  },
  methods: {
    extrairValores() {

      let div = document.createElement('div');
      div.innerHTML = this.modelValue

      let link = div.querySelector('a');

      [...div.children].forEach(c => {
        div.removeChild(c)
      });

      this.titulo = div.textContent
      if(link) {
        this.url = link.href
      } else {
        this.url = null
      }
    },
    alterar() {

      let mutatedValue = this.titulo
      if(this.url) {
        mutatedValue += `<br><font size="2">(<a href="${this.url}" target="_blank" style="text-decoration:underline;color:#669966;">Clique aqui</a> para ouvir a última pregação da série)</font>`;
      }
      this.$emit('update:modelValue', mutatedValue)
    }
  },
  mounted() {
    this.extrairValores()
  }
}
</script>