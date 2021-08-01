<template>
  <div
    class="modal fade"
    :class="{ show: content }"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Pré Visualizar</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.stop.prevent="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if='loading' class="spinner text-center">
            <h1>
              <i class="fas fa-spinner fa-spin"></i>
            </h1>
          </div>
          <iframe v-show='!loading' id="myiframe" ref="html" src=''></iframe>
        </div>
        <div class="modal-footer">
          <button
            @click.stop.prevent="$emit('close')"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    content: null,
  },
  setup() {
    const html = ref(0);
    return {html};
  },
  watch: {
    content(newValue) {
      if (newValue) {
        this.carregaInformativo();
      }
    },
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    carregaInformativo() {
      this.loading = true
      const xhttp = new XMLHttpRequest();
      xhttp.onload = () => {
        this.loading = false
        this.html.src = "data:text/html;charset=iso-8859-1," + escape(xhttp.responseText);
      };
      xhttp.onerror = () => {
        this.loading = false
      }
      xhttp.open("POST", `${process.env.VUE_APP_ENDERECO_PHP}?interno=kbPMQH3PyjQzzwhf`);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(this.content));
    },
  },
};
</script>
<style scoped>
.modal.show {
  display: block;
}
#myiframe {
  width: 100%;
  height: 800px;
}

.spinner {
  width: 100%;
  height: 100%;
}
</style>