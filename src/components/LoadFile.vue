<template>
  <div>
    <input class='form-control' type='file' @change='carregarArquivo($event)' :accept="accept"/>
  </div>
</template>
<script>
export default {
  props: {
    accept: String,
    type: String
  },
  methods: {
    carregarArquivo({target}) {

      let fr = new FileReader()
      fr.onload = () => {
        let json = JSON.parse(fr.result)
        this.$emit('json', json)
      }
      fr.readAsText(target.files[0])
    }
  }


}
</script>