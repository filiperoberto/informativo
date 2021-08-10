<template>
  <div
    class="modal fade"
    :class="{ 'show': edicao }"
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
          <iframe v-if='edicao' id="myiframe" ref="html" :src='url'></iframe>
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
export default {
  props: {
    edicao: null,
  },
  computed: {
    url() {
      return `${process.env.VUE_APP_ENDERECO_PHP}/index.php?edicao=${this.edicao}`
    }
  }
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