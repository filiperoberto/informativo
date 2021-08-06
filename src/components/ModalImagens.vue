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
        <div class="modal-header d-block">
          <form @submit.prevent="enviarImagem($event)">
            <div class="mb-3">
              <input
                class="form-control"
                type="file"
                name='imagem'
                accept="image/png, image/jpeg"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Enviar Arquivo
            </button>
          </form>
          <hr />
          <div class="mb-3 mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Filtro"
              v-model="filter"
            />
          </div>
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
              loading="lazy"
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
import { imagens, upload } from "@/services/service";
export default {
  data() {
    return {
      imagens: [],
      filter: null,
      file: null,
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
      try {
        const { data } = await imagens(this.modalImage.dir);
        this.imagens = data
          .filter((i) => i.indexOf(".html") === -1)
          .filter((i) => i.indexOf(".xcf") === -1)
          .map((i) => {
            return {
              url: `${process.env.VUE_APP_ENDERECO_PHP}/imagens/${this.modalImage.dir}/${i}`,
              name: i,
              show: true,
            };
          });
      } catch (e) {
        console.log(e);
      }
    },
    async enviarImagem(event, overwrite = false) {

      const formData = new FormData()
      formData.append('userfile', event.target.imagem.files[0])
      formData.append('folder', this.modalImage.dir)

      try {
        await upload(formData, overwrite)
        this.carregarImagens()
      } catch(e) {
        console.log(e);
        if((e.response || {}).status === 409) {
          if (window.confirm("Este arquivo já existe no servidor, deseja sobrescrever?")) {
            this.enviarImagem(event, true)
          }
        }
      }
    }
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