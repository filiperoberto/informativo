<template>
<div class="container mt-3">
  <form @submit.stop.prevent="login">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Usuário</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        v-model='formData.username'
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Senha</label>
      <input type="password" class="form-control" v-model='formData.password' id="exampleInputPassword1" />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    async login() {
      this.$store.dispatch('overlay', true)
      try {
        await this.$store.dispatch('login', this.formData)
      } catch(e) {
        this.$store.dispatch('alert',{
          message: 'Falha ao realizar login',
          showing: true,
          type:'erro'
        })
      } finally {
        this.$store.dispatch('overlay', false)
      }
    },
    beforeDestroy() {
      this.$store.dispatch('overlay', false)
    },
  }
}
</script>