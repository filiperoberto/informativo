<template>
  <div v-if="month">
    <input
      type="month"
      id="start"
      name="start"
      class="form-control mb-3"
      @change="changeMonth($event)"
      :value="month"
    />
    <div v-for="(dia, index) in diasDomingo" :key="`dia-${index}`">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ dia }}/{{mesFormatado}}</h5>
          <div class="card-text">
            <div class="mb-3">
              <label :for="`pregador-${index}`" class="form-label"
                >Pregador</label
              >
              <input
                type="text"
                class="form-control"
                :id="`pregador-${index}`"
                :value="escala.escala[mesFormatado][dia].nome"
              />
            </div>
            <div class="mb-3">
              <label :for="`texto-${index}`" class="form-label"
                >Texto</label
              >
              <input
                type="text"
                class="form-control"
                :id="`texto-${index}`"
                :value="escala.escala[mesFormatado][dia].texto"
              />
            </div>
            <div class="mb-3">
              <label :for="`titulo-${index}`" class="form-label"
                >Título</label
              >
              <input
                type="text"
                class="form-control"
                :id="`titulo-${index}`"
                :value="escala.escala[mesFormatado][dia].titulo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { format, parse, eachWeekendOfMonth, isSunday } from "date-fns";
export default {
  props: {
    escala: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    mesFormatado() {
      return format(parse(this.month, "yyyy-MM", new Date()), "MM/yyyy");
    },
    finaisDeSemana() {
      return eachWeekendOfMonth(parse(`${this.month}`, "yyyy-MM", new Date()));
    },
    domingos() {
      return this.finaisDeSemana.filter((d) => isSunday(d));
    },
    diasDomingo() {
      return this.domingos.map((d) => format(d, "dd"));
    },
  },
  methods: {
    changeMonth(event) {
      this.month = event.target.value;
    },
  },
  data() {
    return {
      month: null,
    };
  },
  mounted() {
    this.month = format(new Date(), "yyyy-MM");
  },
};
</script>