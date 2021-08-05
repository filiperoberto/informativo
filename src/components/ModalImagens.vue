<template>
  <div class="modal show" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Imagens {{ dir }}</h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-header">
          <input
            type="text"
            class="form-control"
            placeholder="Filtro"
            v-model="filter"
          />
        </div>

        <div class="modal-body d-flex justify-content-evenly flex-wrap">
          <figure
            class="figure"
            v-show="imagem.show && imagem.name.indexOf(filter || '') > -1"
            v-for="(imagem, index) in imagens"
            :key="index"
          >
            <img
              :src="imagem.url"
              class="img-thumbnail rounded"
              @error="imagem.show = false"
            />
            <figcaption class="figure-caption text-end">
              {{ imagem.name }}
            </figcaption>
          </figure>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dir: {
      type: String,
      default: "avisos",
    },
  },
  data() {
    return {
      imagens: [],
      filter: null,
    };
  },
  methods: {
    async carregarImagens() {
      const response = await fetch(
        `${process.env.VUE_APP_ENDERECO_PHP}/imagens.php?dir=${this.dir}`
      );
      this.imagens = (await response.json()).map((i) => {
        return {
          url: `${process.env.VUE_APP_ENDERECO_PHP}/imagens/${this.dir}/${i}`,
          name: i,
          show: true,
        };
      });
    },
  },
  mounted() {
    this.carregarImagens();
  },
};
</script>
<style scoped>
.modal.show {
  display: block;
}
.img-thumbnail {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>