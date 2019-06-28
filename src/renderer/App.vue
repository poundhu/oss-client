<template>
    <div id="app">
        <layout></layout>
    </div>
</template>

<script>
  import Layout from './layout/'

  export default {
    name: 'oss-client',
    components: { Layout }
  }
</script>

<style lang="scss">
    #app {
        height: 100vh;
        width: 100vw;
    }
</style>
