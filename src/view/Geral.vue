<template>
  <div class="container mt-2 mb-5">
    <h2>Informações Gerais</h2>
    <div class="d-grid gap-2 col-lg-6 mx-auto mt-2">
      <button class="btn btn-primary" @click="carregarJson" type="button">
        Carregar do Servidor
      </button>
      <button
        class="btn btn-warning"
        @click="salvarNoServidor(false)"
        type="button"
      >
        Salvar no Servidor
      </button>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: aba === 'escala-pregacao' }"
            aria-current="page"
            href="#"
            @click="aba = 'escala-pregacao'"
            >Escala de Pregações</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: aba === 'agenda' }"
            href="#"
            @click="aba = 'agenda'"
            >Agenda</a
          >
        </li>
      </ul>
      <template v-if="json.secoes">
        <escala-pregacoes
          v-model="json.secoes[aba]['escala']"
          v-if="aba === 'escala-pregacao'"
        />
        <agenda v-model="json.secoes[aba]['eventos']" v-if="aba === 'agenda'" />
      </template>
    </div>
  </div>
</template>
<script>
import { loadGeneral, upload } from "@/services/service";
import { events } from "@/services/online-service";
import EscalaPregacoes from "@/components/EscalaPregacoes";
import Agenda from "@/components/Agenda";
import { format, parseISO } from "date-fns";
import { groupBy } from 'lodash'

export default {
  components: {
    Agenda,
    EscalaPregacoes,
  },
  data() {
    return {
      json: {},
      saveInterval: null,
      aba: "escala-pregacao",
    };
  },
  computed: {},
  methods: {
    async carregarJson() {
      try {
        this.$store.dispatch("overlay", true);
        const { data } = await loadGeneral();
        this.json = data;
      } catch (e) {
        console.log(e);
      } finally {
        this.$store.dispatch("overlay", false);
      }
    },
    async carregarEventos() {
      try {
        const { data } = await events();
        const eventos = data.map((evt) => {
          const date = parseISO(evt.start, "yyyy-MM-dd", new Date())
          return {
            mes: format(date, "MM/yyyy"),
            dia: format(date, "dd"),
            evento: evt.title,
            horario: evt.raw,
          };
        })

        const porMes = groupBy(eventos,'mes')
        for(const mes in porMes) {

          const dias = groupBy(porMes[mes], 'dia')

          if(!this.json.secoes.agenda.eventos[mes]) {
            this.json.secoes.agenda.eventos[mes] = {}
          }

          for(const dia in dias) {
            const evt = dias[dia].map(({evento, horario}) => { return {evento, horario}})

            this.json.secoes.agenda.eventos[mes][dia] = evt
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    salvarPeriodicamente() {
      clearInterval(this.saveInterval);
      this.saveInterval = setInterval(() => {
        this.$store.dispatch("salvarGeral", this.json);
      }, 5000);
    },
    async salvarNoServidor(overwrite = false) {
      let confirma = overwrite;

      if (!confirma) {
        if (!window.confirm(`Fazer upload do informativo.json?`)) {
          return;
        }
      }
      try {
        let formData = new FormData();

        this.$store.dispatch("overlay", true);

        const jsonse = JSON.stringify(
          this.json,
          null,
          this.$store.state.dev ? null : 4
        );
        const blob = new Blob([jsonse], { type: "application/json" });

        formData.append("userfile", blob);
        formData.append("filename", "informativo.json");
        await upload(formData, overwrite);

        this.$store.dispatch("alert", {
          message: "Upload realizado com sucesso!",
          showing: true,
          type: "sucesso",
        });
      } catch (e) {
        if ((e.response || {}).status === 409) {
          if (
            window.confirm(
              "Este arquivo já existe no servidor, deseja sobrescrever?"
            )
          ) {
            this.salvarNoServidor(true);
          }
        }
      } finally {
        this.$store.dispatch("overlay", false);
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.saveInterval);
    this.$store.dispatch("salvarGeral", this.json);
  },
  mounted() {
    this.json = this.$store.state.geral;
    this.salvarPeriodicamente();
    this.carregarEventos();
  },
};
</script>