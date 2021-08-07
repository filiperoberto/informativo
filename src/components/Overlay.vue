<template>
  <div class="d-flex justify-content-center align-items-center overlay" v-if='$store.state.overlay'>
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}

.spinner-grow {
  margin-left: 5px;
}

.spinner-grow:nth-of-type(2) {
  animation-delay: 0.1s;
}
.spinner-grow:nth-of-type(3) {
  animation-delay: 0.2s;
}
.spinner-grow:nth-of-type(4) {
  animation-delay: 0.3s;
}
</style>