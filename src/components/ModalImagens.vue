<template>
  <div class="modal" :class="{ show: modalImage.open }" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Imagens {{ modalImage.dir }}</h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$store.dispatch('closeSelectImage')"
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
            :class="{
              'border border-primary border-2':
                imagem.name === modalImage.selected,
            }"
            v-show="imagem.show && imagem.name.indexOf(filter || '') > -1"
            v-for="(imagem, index) in imagens"
            :key="index"
            @click="$store.dispatch('selectModalImage', imagem.name)"
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
            @click="$store.dispatch('closeSelectImage')"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      imagens: [],
      filter: null,
    };
  },
  computed: {
    ...mapState(["modalImage"]),
  },
  watch: {
    "modalImage.open"(newValue) {
      if (newValue) {
        this.carregarImagens();
      }
    },
  },
  methods: {
    async carregarImagens() {
      const response = await fetch(
        `${process.env.VUE_APP_ENDERECO_PHP}/imagens.php?dir=${this.modalImage.dir}`
      );
      this.imagens = (await response.json())
        .filter((i) => i.indexOf(".html") === -1)
        .filter((i) => i.indexOf(".xcf") === -1)
        .map((i) => {
          return {
            url: `${process.env.VUE_APP_ENDERECO_PHP}/imagens/${this.modalImage.dir}/${i}`,
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
.figure {
  cursor: pointer;
}
</style>