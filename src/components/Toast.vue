<template>
  <div
    class="position-fixed bottom-0 end-0 p-3"
    style="z-index: 11"
    v-if="toast.showing"
  >
    <div
      class="toast align-items-center text-white border-0 fade showing show"
      :class="{
        'bg-success': toast.type === 'sucesso',
        'bg-danger': toast.type === 'erro',
        'bg-warning': toast.type === 'aviso',
      }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">{{ toast.message }}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="hide"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["toast"]),
  },
  watch: {
    'toast.showing'(newValue) {
      if(newValue) {
        this.doShow()
      }
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  methods: {
    hide() {
      this.$store.dispatch('alert',{})
    },
    doShow() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(this.hide, 30000)
    }
  },
  mounted() {
    this.doShow()
  }
};
</script>