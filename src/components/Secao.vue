<template>
  <div class="card secao" v-if='mutatedValue' :class="{'is-active': ativo}">
    <div class="card-body">
      <h5 class="card-title text-capitalize">{{ title }}</h5>
      <div class="card-text">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            v-model='ativo'
            id="switchAtivo"
            @change="alterar"
            :checked='ativo'
          />
          <label class="form-check-label" for="switchAtivo"
            >Ativo</label
          >
        </div>
        <template v-if="ativo">
        <template v-for='(conteudo,index) in mutatedValue.lista' :key='`conteudo-${index}`'>
          <conteudo  :modelValue='conteudo' :destaque='index===0' @update:modelValue='alterarConteudo(conteudo, $event)'/>
        </template>
        <conteudo v-if='mutatedValue.artigo' :modelValue='mutatedValue.artigo' @update:modelValue='alterarConteudo(mutatedValue.artigo, $event)'/>
        <conteudo v-if='mutatedValue.livro' :modelValue='mutatedValue.livro' @update:modelValue='alterarConteudo(mutatedValue.livro, $event)'/>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Conteudo from "@/components/Conteudo";
export default {
  components: {
    Conteudo
  },
  props: {
    chave: String,
    modelValue: Object,
  },
  data() {
    return {
      mutatedValue: null,
      ativo: null
    }
  },
  computed: {
    title() {
      return this.chave.split("-").join(" ");
    }
  },
  watch: {
    modelValue() {
      this.mutatedValue = this.modelValue
      this.ativo = this.mutatedValue.ativa === '1'
    }
  },
  methods: {
    alterarConteudo(anterior, novo) {
      anterior = novo
      this.alterar()
    },
    alterar() {

      const value = { ...this.mutatedValue, ...{ ativa: this.ativo ? '1': '0' } }

      //console.log(value)

      this.$emit('update:modelValue', value)

      this.$emit('coisa')
    }
  },
  mounted() {
    this.mutatedValue = this.modelValue
    this.ativo = this.mutatedValue.ativa === '1'
  }
};
</script>
<style scoped>
.secao {
  opacity: 0.5;
}
.secao.is-active {
opacity: 1;
}
</style>