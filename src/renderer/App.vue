<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  import Layout from './layout/'

  export default {
    name: 'oss-client',
    components: { Layout },
    mounted () {
      document.addEventListener('dragover', (event) => event.preventDefault(), false)
      document.addEventListener('drop', (event) => event.preventDefault(), false)
    }
  }
</script>

<style lang="scss">
    #app {
        height: 100vh;
        width: 100vw;
    }
</style>
