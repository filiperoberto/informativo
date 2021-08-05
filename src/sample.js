export default {
  numero: null,

  data: null,

  secoes: {
    avisos: {
      ativa: "1",

      lista: [],
    },
    artigo: {
      ativa: "0",
      artigo: {
        titulo: "",
        autor: "",
        imagem: "",
        texto: [],
      },
    },
    "sugestao-leitura": {
      ativa: "0",

      livro: {
        titulo: "",
        autor: "",
        editora: "",
        paginas: "",
        url: "",
        imagem: "",
        descricao: [],
      },
    },
    "plano-leitura-biblica": {
      ativa: "0"
    },
    "escala-pregacao": {
      ativa: "1"
    },

    aniversariantes: {
      ativa: "1"
    },

    agenda: {
      ativa: "1"
    },
  },
}