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
  import uuidV1 from 'uuid/v1'

  import LHeader from './l-header'
  import appMixin from '@/mixins/app'
  import transferMixin from '@/mixins/transfer'

  export default {
    name: 'index',
    components: { LHeader },
    mixins: [appMixin, transferMixin],
    mounted () {
      this.clearDownloads()
      this.initOSS(this.oss)

      ipcRenderer.on('download complete', (event, file) => {
        this.removeDownload(file)
      })

      ipcRenderer.on('to', (event, path) => {
        this.$router.push(path)
      })

      console.log(this.$route)

      document.addEventListener('drop', async (event) => {
        if (this.curBucketName && this.$route.path === '/m') {
          const files = event.dataTransfer.files
          for (const file of files) {
            const uuid = uuidV1()
            this.pushUpload({ uuid, putTime: file.lastModified, fsize: file.size, mimeType: file.type, key: file.name })
            const done = await this.oss.upload(this.curBucketName, file, file.name, uuid)
            this.removeUpload(done)
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
