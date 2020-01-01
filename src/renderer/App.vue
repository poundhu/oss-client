<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Layout from './layout/'
  import appMixin from '@/mixins/app'
  import transferMixin from '@/mixins/transfer'

  export default {
    name: 'oss-client',
    components: { Layout },
    mixins: [appMixin, transferMixin],
    mounted () {
      // this.clearDownloads()
      // this.clearUploads()
      // this.initOSS(this.oss)
      this.initGlobalState()
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
