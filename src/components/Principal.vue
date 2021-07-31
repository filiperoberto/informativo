<template>
  <div class="container mt-2">
    <h2>Informativo IBRVN</h2>
    <load-file @json="carregaJson" />
    <form class="row g-3 mt-3" v-if='json'>
      <div class="col-md-6">
        <label for="edicao" class="form-label">Edição</label>
        <input type="number" class="form-control" id="edicao" v-model.number='json.numero'/>
      </div>
      <div class="col-md-6">
        <label for="data" class="form-label">Data</label>
        <input type="date" class="form-control" id="data" v-model='json.data'/>
      </div>
      <secao @coisa='coisa' v-for="(secao,chave) of json.secoes" :key='chave' :chave='chave' v-model='json.secoes[chave]'/>
    </form>
  </div>
</template>
<script>
import { parse, format } from 'date-fns'
import LoadFile from "@/components/LoadFile";
import Secao from "@/components/Secao";
export default {
  components: {
    LoadFile,
    Secao
  },
  data() {
    return {
      json: null,
    };
  },
  methods: {
    carregaJson (json) {
      this.json = { ...json, data: format(parse(json.data, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')}
      console.log(this.json);
    },
    coisa () {
      console.log(JSON.stringify(this.json));
    }
  }
};
</script>