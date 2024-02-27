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
      <label :for="`audio-${uid}`" class="form-label">Url Última Pregação (Opcional)</label>
      <input
        type="text"
        class="form-control"
        :id="`audio-${uid}`"
        v-model="url"
        @change="alterar"
      />
    </div>
    <div class="mb-3" v-if='url'>
      <label :for="`label-${uid}`" class="form-label">Rótulo Url Última Pregação (Clique aqui ... )</label>
      <input
        type="text"
        class="form-control"
        :id="`label-${uid}`"
        v-model="label"
        @change="alterar"
      />
    </div>
  </div>
</template>
<script>
import { getCurrentInstance } from 'vue'
export default {
  props: {
    modelValue: String,
  },
  data() {
    return {
      titulo: null,
      url: null,
      label: "para assistir à última pregação da série"
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
      let font = div.querySelector('font');

      [...div.children].forEach(c => {
        div.removeChild(c)
      });

      this.titulo = div.textContent
      if(link) {
        this.url = link.href
      } else {
        this.url = null
      }

      if(font) {
        font.removeChild(link);
        this.label = font.textContent.replace('(',"").replace(')',"").trim()
      } else {
        this.label = 'para assistir à última pregação da série'
      }

      this.$emit('titulo', this.titulo)
      this.$emit('url',this.url)
      this.$emit('label',this.label)

    },
    alterar() {

      let mutatedValue = this.titulo
      if(this.url) {
        mutatedValue += `<br><font size="2">(<a href="${this.url}" target="_blank" style="text-decoration:underline;color:#669966;">Clique aqui</a> ${this.label})</font>`;
      }
      this.$emit('update:modelValue', mutatedValue)
    }
  },
  mounted() {
    this.extrairValores()
  }
}
</script>