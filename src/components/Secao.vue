<template>
  <div class="card secao" v-if="mutatedValue" :class="{ 'is-active': ativo }">
    <div class="card-body">
      <h5 class="card-title text-capitalize">{{ title }}</h5>
      <div class="card-text">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="ativo"
            :id="`switchAtivo-${uid}`"
            @change="alterar"
            :checked="ativo"
          />
          <label class="form-check-label" :for="`switchAtivo-${uid}`">Ativo</label>
          <div class="d-grid gap-2 col-6 mx-auto" v-if='mutatedValue.lista'>
            <button class="btn btn-primary" type="button" @click.stop.prevent="add()">
              Adicionar Bloco
            </button>
          </div>
        </div>
        <div class="mt-3">
          <template v-if="ativo">
            <template
              v-for="(conteudo, index) in mutatedValue.lista"
              :key="`conteudo-${index}`"
            >
              <conteudo
                :modelValue="conteudo"
                removivel
                @remove="remover(index)"
                :dir="index === 0 ? 'destaques' : 'avisos'"
                @update:modelValue="alterarConteudo(conteudo, $event)"
              />
            </template>
            <conteudo
              v-if="mutatedValue.artigo"
              :modelValue="mutatedValue.artigo"
              dir='artigos'
              @update:modelValue="alterarConteudo(mutatedValue.artigo, $event)"
            />
            <conteudo
              v-if="mutatedValue.livro"
              dir='livros'
              :modelValue="mutatedValue.livro"
              @update:modelValue="alterarConteudo(mutatedValue.livro, $event)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Conteudo from "@/components/Conteudo";
import { getCurrentInstance } from 'vue'
export default {
  components: {
    Conteudo,
  },
  props: {
    chave: String,
    modelValue: Object,
  },
  setup() {
    const uid = getCurrentInstance().uid

    return {
      uid
    }
  },
  data() {
    return {
      mutatedValue: null,
      ativo: null,
    };
  },
  computed: {
    title() {
      return this.chave.split("-").join(" ");
    },
  },
  watch: {
    modelValue() {
      this.mutatedValue = this.modelValue;
      this.ativo = this.mutatedValue.ativa === "1";
    },
  },
  methods: {
    alterarConteudo(anterior, novo) {
      anterior = novo;
      this.alterar();
    },
    remover(index) {
      this.mutatedValue.lista.splice(index, 1)
      this.alterar()
    },
    add() {
      this.mutatedValue.lista.push({ titulo: '', texto: [] })
      this.alterar()
    },
    alterar() {
      const value = {
        ...this.mutatedValue,
        ...{ ativa: this.ativo ? "1" : "0" },
      };

      this.$emit("update:modelValue", value);
    },
  },
  mounted() {
    this.mutatedValue = this.modelValue;
    this.ativo = this.mutatedValue.ativa === "1";
  },
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