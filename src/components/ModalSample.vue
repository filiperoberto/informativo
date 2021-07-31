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
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.stop.prevent="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <iframe id="myiframe" ref="html" src=''></iframe> 
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
  methods: {
    carregaInformativo() {
      const xhttp = new XMLHttpRequest();
      xhttp.onload = () => {
        this.html.src = "data:text/html;charset=iso-8859-1," + escape(xhttp.responseText);
      };
      xhttp.open("POST", process.env.VUE_APP_ENDERECO_PHP);
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
</style>