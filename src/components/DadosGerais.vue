<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label for="tituloInformativo" class="form-label">Título</label>
          <input
            type="text"
            v-model="mutableValue.titulo"
            class="form-control"
            @change="enviarDados()"
            id="tituloInformativo"
          />
          <hr />
          <template v-if="mutableValue.contato">
            <div v-show="false">
              <h5 class="card-title">Informações de Contato</h5>
              <label for="nomeContatoInformativo" class="form-label"
                >Nome Contato</label
              >
              <input
                type="text"
                v-model="mutableValue.contato.nome"
                class="form-control"
                @change="enviarDados()"
                id="nomeContatoInformativo"
              />
              <label for="nomeContatoInformativo" class="form-label"
                >Email Contato</label
              >
              <input
                type="text"
                v-model="mutableValue.contato.email"
                class="form-control"
                @change="enviarDados()"
                id="nomeContatoInformativo"
              />
            </div>
          </template>
          <template v-if="mutableValue.igreja">
            <h5 class="card-title">Informações da Igreja</h5>
            <label for="iniciaisIgrejaInformativo" class="form-label"
              >Iniciais</label
            >
            <input
              type="text"
              v-model="mutableValue.igreja.iniciais"
              class="form-control"
              @change="enviarDados()"
              id="iniciaisIgrejaInformativo"
            />
            <label for="nomeIgrejaInformativo" class="form-label">Nome</label>
            <input
              type="text"
              v-model="mutableValue.igreja.nome"
              class="form-control"
              @change="enviarDados()"
              id="nomeIgrejaInformativo"
            />
            <template v-if="mutableValue.igreja.endereco">
              <label
                for="logradouroEnderecoIgrejaInformativo"
                class="form-label"
                >Logradouro</label
              >
              <input
                type="text"
                v-model="mutableValue.igreja.endereco.logradouro"
                class="form-control"
                @change="enviarDados()"
                id="logradouroEnderecoIgrejaInformativo"
              />
              <div class="row">
                <div class="col-md-8">
                  <label
                    for="bairroEnderecoIgrejaInformativo"
                    class="form-label"
                    >Bairro</label
                  >
                  <input
                    type="text"
                    v-model="mutableValue.igreja.endereco.bairro"
                    class="form-control"
                    @change="enviarDados()"
                    id="bairroEnderecoIgrejaInformativo"
                  />
                </div>
                <div class="col-md-4">
                  <label
                    for="numeroEnderecoIgrejaInformativo"
                    class="form-label"
                    >Número</label
                  >
                  <input
                    type="number"
                    v-model.number="mutableValue.igreja.endereco.numero"
                    class="form-control"
                    @change="enviarDados()"
                    id="numeroEnderecoIgrejaInformativo"
                  />
                </div>
                <div class="col-md-6">
                  <label
                    for="cidadeEnderecoIgrejaInformativo"
                    class="form-label"
                    @change="enviarDados()"
                    >Cidade</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="cidadeEnderecoIgrejaInformativo"
                    @change="enviarDados()"
                    v-model="mutableValue.igreja.endereco.cidade"
                  />
                </div>
                <div class="col-md-2">
                  <label
                    for="estadoEnderecoIgrejaInformativo"
                    class="form-label"
                    >Estado</label
                  >
                  <select
                    id="estadoEnderecoIgrejaInformativo"
                    class="form-select"
                    @change="enviarDados()"
                    v-model="mutableValue.igreja.endereco.estado"
                  >
                    <option
                      v-for="estado in estados"
                      :key="estado.codigo_uf"
                      :value="estado.uf"
                    >
                      {{ estado.uf }}
                    </option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="cepEnderecoIgrejaInformativo" class="form-label"
                    >CEP</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="cepEnderecoIgrejaInformativo"
                    @change="enviarDados()"
                    v-model="mutableValue.igreja.endereco.cep"
                  />
                </div>
                <div class="col-md-6">
                  <label
                    for="labeltelefoneEnderecoIgrejaInformativo"
                    class="form-label"
                    >Rótulo Telefone</label
                  >
                  <input
                    type="text"
                    v-model="mutableValue.igreja.endereco.labelTelefone"
                    class="form-control"
                    @change="enviarDados()"
                    id="labeltelefoneEnderecoIgrejaInformativo"
                  />
                </div>
                <div class="col-md-6">
                  <label
                    for="telefoneEnderecoIgrejaInformativo"
                    class="form-label"
                    >Telefone</label
                  >
                  <input
                    type="text"
                    v-model="mutableValue.igreja.endereco.telefone"
                    class="form-control"
                    @change="enviarDados()"
                    id="telefoneEnderecoIgrejaInformativo"
                  />
                </div>
              </div>
            </template>
            <hr />
            <template v-if='mutableValue.links'>
              <h5 class="card-title">Links Rodapé</h5>
              <links v-model='mutableValue.links' @change="enviarDados()"/>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Links from "@/components/Links";
export default {
  components: {
    Links
  },
  props: {
    titulo: {
      type: String,
      default: "Informativo Online",
    },
    contato: {
      type: Object,
      default: () => {},
    },
    igreja: {
      type: Object,
      default: () => {},
    },
    links: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      mutableValue: {},
      estados: [
        { codigo_uf: 27, uf: "AL", unidade_federativa: "Alagoas" },
        { codigo_uf: 12, uf: "AC", unidade_federativa: "Acre" },
        { codigo_uf: 16, uf: "AP", unidade_federativa: "Amapá" },
        { codigo_uf: 13, uf: "AM", unidade_federativa: "Amazonas" },
        { codigo_uf: 29, uf: "BA", unidade_federativa: "Bahia" },
        { codigo_uf: 23, uf: "CE", unidade_federativa: "Ceará" },
        { codigo_uf: 53, uf: "DF", unidade_federativa: "Distrito Federal" },
        { codigo_uf: 32, uf: "ES", unidade_federativa: "Espírito Santo" },
        { codigo_uf: 52, uf: "GO", unidade_federativa: "Goías" },
        { codigo_uf: 21, uf: "MA", unidade_federativa: "Maranhão" },
        { codigo_uf: 51, uf: "MT", unidade_federativa: "Mato Grosso" },
        { codigo_uf: 50, uf: "MS", unidade_federativa: "Mato Grosso do Sul" },
        { codigo_uf: 31, uf: "MG", unidade_federativa: "Minas Gerais" },
        { codigo_uf: 15, uf: "PA", unidade_federativa: "Pará" },
        { codigo_uf: 25, uf: "PB", unidade_federativa: "Paraíba" },
        { codigo_uf: 41, uf: "PR", unidade_federativa: "Paraná" },
        { codigo_uf: 26, uf: "PE", unidade_federativa: "Pernambuco" },
        { codigo_uf: 22, uf: "PI", unidade_federativa: "Piauí" },
        { codigo_uf: 33, uf: "RJ", unidade_federativa: "Rio de Janeiro" },
        { codigo_uf: 24, uf: "RN", unidade_federativa: "Rio Grande do Norte" },
        { codigo_uf: 43, uf: "RS", unidade_federativa: "Rio Grande do Sul" },
        { codigo_uf: 11, uf: "RO", unidade_federativa: "Rondônia" },
        { codigo_uf: 14, uf: "RR", unidade_federativa: "Roraíma" },
        { codigo_uf: 42, uf: "SC", unidade_federativa: "Santa Catarina" },
        { codigo_uf: 35, uf: "SP", unidade_federativa: "São Paulo" },
        { codigo_uf: 28, uf: "SE", unidade_federativa: "Sergipe" },
        { codigo_uf: 17, uf: "TO", unidade_federativa: "Tocantins" },
      ],
    };
  },
  watch: {
    titulo(newValue) {
      this.mutableValue.titulo = newValue;
    },
    contato(newValue) {
      this.mutableValue.contato = newValue;
    },
    igreja(newValue) {
      this.mutableValue.igreja = newValue;
    },
    links(newValue) {
      this.mutableValue.links = newValue;
    },
  },
  methods: {
    enviarDados() {
      this.$emit("atualiza", this.mutableValue);
    },
  },
  mounted() {
    this.mutableValue = {
      titulo: this.titulo,
      contato: this.contato,
      igreja: this.igreja,
      links: this.links,
    };
  },
};
</script>