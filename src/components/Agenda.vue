<template>
  <div v-if="day">
    <input
      type="date"
      id="start"
      name="start"
      class="form-control mb-3"
      @change="changeMonth($event)"
      :value="day"
    />
    <div class="card">
      <div class="card-header" v-if='false'>
        <button class="btn btn-small btn-primary" @click="adicionarEvento">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="list-group list-group-flush">
        <div
          class="list-group-item"
          v-for="(event, index) in eventos"
          :key="`eventos-${index}`"
        >
          <div class="row">
            <div class="col-6">
              <input
                type="text"
                readonly
                class="form-control"
                placeholder="Evento"
                v-model="event.evento"
                @change="$emit('update:modelValue', mutatedValue)"
              />
            </div>
            <div class="col-6">
              <input
                type="text"
                readonly
                class="form-control"
                placeholder="Horário"
                v-model="event.horario"
                @change="$emit('update:modelValue', mutatedValue)"
              />
            </div>
              <div class="col-2" v-if='false'>
                <button
                  class="btn btn-small btn-danger"
                  @click="remover(index)"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { format, parse } from "date-fns";
export default {
  props: {
    modelValue: Object,
  },
  computed: {
    mesFormatado() {
      return format(parse(this.day, "yyyy-MM-dd", new Date()), "MM/yyyy");
    },
    diaFormatado() {
      return format(parse(this.day, "yyyy-MM-dd", new Date()), "dd");
    },
    eventos() {
      if (!this.mutatedValue[this.mesFormatado]) {
        return [];
      }
      return this.mutatedValue[this.mesFormatado][this.diaFormatado] || [];
    },
  },
  watch: {
    modelValue() {
      this.mutatedValue = this.modelValue;
    },
  },
  methods: {
    remover(index) {
      this.mutatedValue[this.mesFormatado][this.diaFormatado].splice(index,1)

      this.$emit("update:modelValue", this.mutatedValue);
    },
    changeMonth(event) {
      this.day = event.target.value;
    },
    adicionarEvento() {
      if (!this.mutatedValue[this.mesFormatado]) {
        this.mutatedValue[this.mesFormatado] = {};
      }
      if (!this.mutatedValue[this.mesFormatado][this.diaFormatado]) {
        this.mutatedValue[this.mesFormatado][this.diaFormatado] = [];
      }

      this.mutatedValue[this.mesFormatado][this.diaFormatado].push({
        evento: null,
        horario: null,
      });

      this.$emit("update:modelValue", this.mutatedValue);
    },
  },
  data() {
    return {
      day: null,
      mutatedValue: null,
    };
  },
  mounted() {
    this.day = format(new Date(), "yyyy-MM-dd");
    this.mutatedValue = this.modelValue;
  },
};
</script>