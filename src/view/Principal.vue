<template>
  <div class="container mt-2 mb-5">
    <h2>Informativo IBRVN</h2>
    <load-file @json="carregaJson" />
    <div class="d-grid gap-2 col-6 mx-auto mt-2" v-if="json">
      <button class="btn btn-primary" @click="load" type="button">Carregar Edição</button>
      <button class="btn btn-warning" @click="save(false)" type="button" :disabled='!json.numero'>Salvar Edição</button>
      <button class="btn btn-primary" @click="preview" :disabled='!json.numero || !json.data'>Pré Visualizar</button>
      <button class="btn btn-primary" @click="download" type="button">
        Download Json
      </button>
      <button class="btn btn-danger" @click="limparFormulario" type="button">
        Limpar Formulário
      </button>
    <form class="row g-3 mt-3" v-if="json">
      <div class="col-md-6">
        <label for="edicao" class="form-label">Edição</label>
        <input
          type="number"
          class="form-control"
          id="edicao"
          v-model.number="json.numero"
        />
      </div>
      <div class="col-md-6">
        <label for="data" class="form-label">Data</label>
        <input type="date" class="form-control" id="data" v-model="json.data" />
      </div>
      <secao
        v-for="(secao, chave) of json.secoes"
        :key="chave"
        :chave="chave"
        v-model="json.secoes[chave]"
      />
    </form>
    </div>

  </div>
  <modal-sample @close="sample = null" :content="sample" />
  <modal-imagens />
</template>
<script>
import { parse, format } from "date-fns";
import LoadFile from "@/components/LoadFile";
import Secao from "@/components/Secao";
import ModalSample from "@/components/ModalSample";
import ModalImagens from "@/components/ModalImagens";
import exemplo from '../sample'
import { load, upload } from '@/services/service'
export default {
  components: {
    LoadFile,
    Secao,
    ModalSample,
    ModalImagens,
  },
  data() {
    return {
      json: null,
      sample: null,
      saveInterval: null
    };
  },
  methods: {
    async load() {
      try {

        this.$store.dispatch('overlay', true)
        
        const edicao = prompt("Digite a edição:");
        const {data} = await load(edicao)
        this.carregaJson(data)
      } catch({response}) {
        this.$store.dispatch('alert',{
          message: ((response || {}).data || {}).msg,
          showing: true,
          type:'erro'
        })
      } finally {
        this.$store.dispatch('overlay', false)
      }
    },
    async save(overwrite = false) {
      
      let confirma = overwrite

      if(!confirma) {
        if(!window.confirm(`Fazer upload da edição ${this.json.numero}?`)) {
          return
        }
      }
      try {
        let formData = new FormData();

        this.$store.dispatch('overlay', true)
        
        const jsonse = JSON.stringify(this.json);
        const blob = new Blob([jsonse], {type: "application/json"});

        formData.append('userfile', blob)
        formData.append('folder', 'edicoes')
        formData.append('numero', this.json.numero)
        await upload(formData, overwrite)

        this.$store.dispatch('alert',{
          message: 'Upload realizado com sucesso!',
          showing: true,
          type:'sucesso'
        })

      } catch(e) {
          if((e.response || {}).status === 409) {
            if (window.confirm("Este arquivo já existe no servidor, deseja sobrescrever?")) {
              this.save(true)
            }
        }
      } finally {
        this.$store.dispatch('overlay', false)
      }
    },
    limparFormulario() {
      if (window.confirm("Tem certeza que deseja limpar o formulário?")) {
        this.json = exemplo
      }
    },
    carregaJson(json) {
      this.json = {
        ...json,
        data: format(parse(json.data, "dd/MM/yyyy", new Date()), "yyyy-MM-dd"),
      };
    },
    salvarPeriodicamente() {
      clearInterval(this.saveInterval)
      this.saveInterval = setInterval(() => {
        this.$store.dispatch('salvar', this.json)
      },5000)
    },
    preview() {
      this.sample = this.formatarJson();
    },
    formatarJson() {
      return {
        ...this.json,
        data: format(
          parse(this.json.data, "yyyy-MM-dd", new Date()),
          "dd/MM/yyyy"
        ),
      };
    },
    download() {
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(this.formatarJson()))
      );
      element.setAttribute("download", `${this.json.numero}.json`);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
  beforeUnmount() {
    clearInterval(this.saveInterval)
    this.$store.dispatch('salvar', this.json)
  },
  mounted() {
    this.json = this.$store.state.salvo || exemplo
    this.salvarPeriodicamente()
  }
};
</script>