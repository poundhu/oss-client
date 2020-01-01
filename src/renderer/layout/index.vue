<template>
  <div class="layout">
    <l-header class="layout-header"></l-header>
    <keep-alive>
      <router-view class="layout-main"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'

  import LHeader from './l-header'

  export default {
    name: 'index',
    components: { LHeader },
    mounted () {
      ipcRenderer.on('download complete', (event, { downloadId }) => {
        this.removeDownload(downloadId)
      })

      ipcRenderer.on('to', (event, path) => {
        this.$router.push(path)
      })

      document.addEventListener('drop', async (event) => {
        if (this.curBucketName && this.$route.path === '/m') {
          const { files } = event.dataTransfer
          for (const file of files) {
            this.uploadItem(file)
          }
        }
      }, false)
    }
  }
</script>

<style scoped lang="scss">
  .layout {
    height: 100%;
    display: flex;
    flex-direction: column;

    .layout-header {
      height: 75px;
    }

    .layout-main {
      flex: 1;
    }
  }
</style>
