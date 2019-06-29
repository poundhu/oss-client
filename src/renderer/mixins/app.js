import { mapGetters, mapActions } from 'vuex'
import { remote, clipboard, ipcRenderer } from 'electron'
import url from 'url'
import uuidV1 from 'uuid/v1'

import Creator from '@/assets/script/oss'
import { pathJoin } from '@/assets/script/utils'

const Menu = remote.Menu

export default {
  methods: {
    ...mapActions(['setCurBucket', 'setBucketFiles',
      'setBuckets', 'setBucketLoading', 'setBucketTableView', 'setDirFiles', 'pushPrev',
      'popPrev', 'addSelectedItem', 'removeSelectedItem', 'selectAllItem',
      'clearAllSelected', 'setOSS', 'addOSS', 'pushDownload']),
    async initBuckets () {
      const buckets = await this.oss.buckets()
      await this.setBuckets(buckets)
      await this.initBucket(this.curBucketName || buckets[0])
    },
    async initBucket (bucket) {
      await this.setBucketLoading(true)
      const { items } = await this.oss.bucketFiles(bucket)
      await this.setBucketFiles({ name: bucket, files: items })
      await this.setCurBucket(bucket)
      await this.setBucketLoading(false)
      await this.changeDirectory('')
    },
    changeDirectory (path, next = true) {
      let dirFiles = []
      const tempPath = path ? path + '/' : ''
      for (let file of this.curBucketFiles) {
        if (!tempPath) {
          const pathArr = file.key.split('/')
          if (pathArr.length === 1) {
            dirFiles.push(file)
          } else {
            if (dirFiles.findIndex(i => i.key === pathArr[0]) < 0) {
              dirFiles.push({ isFolder: true, key: pathArr[0] })
            }
          }
        } else {
          if (file.key.indexOf(tempPath) === 0) {
            let key = file.key.slice(tempPath.length, file.key.length)
            const pathArr = key.split('/')
            if (pathArr.length === 1) {
              dirFiles.push(file)
            } else {
              if (dirFiles.findIndex(i => i.key === pathArr[0]) < 0) {
                dirFiles.push({ isFolder: true, key: pathArr[0] })
              }
            }
          }
        }
      }
      if (next) {
        this.pushPrev(path)
      }
      this.setDirFiles(dirFiles)
    },
    async initOSS (oss) {
      if (oss) {
        this.addOSS(oss)
        const ossObject = Creator.create(oss)
        this.setOSS(ossObject)
        this.initBuckets()
      }
    },
    contextMenu ({ isFolder, hash }) {
      if (isFolder) {
        this.openFolderContextMenu(hash)
      } else {
        this.openFileContextMenu(hash)
      }
    },
    dblClick (item) {
      if (item.isFolder) {
        const localPath = pathJoin([this.curPath, item.key])
        this.changeDirectory(localPath)
      }
    },
    openFileContextMenu (hash) {
      const file = this.curBucketFiles.find(i => i.hash === hash)
      const menu = Menu
        .buildFromTemplate([{
          label: '重命名'
        }, {
          label: '选择',
          click: () => {
            this.addSelectedItem(hash)
          }
        }, {
          label: '全选'
        }, { type: 'separator' }, {
          label: '复制链接',
          click: () => {
            clipboard.writeText(file.key)
            this.$message.success('复制成功')
          }
        }, {
          label: '复制链接（markdown）'
        }, { type: 'separator' }, {
          label: '下载',
          click: () => {
            if (this.oss.domain.length > 0) {
              const uuid = uuidV1()
              const transferFile = { uuid, ...file }
              this.pushDownload(transferFile)
              const fileUrl = url.format({
                protocol: 'http:',
                host: this.oss.domain[0],
                pathname: encodeURI(file.key)
              }).toString()
              ipcRenderer.send('download', {
                url: fileUrl,
                properties: { directory: 'D:/download/', uuid }
              })
            }
          }
        }, {
          label: '删除'
        }])
      menu.popup(remote.getCurrentWindow())
    },
    openFolderContextMenu (hash) {
      const menu = Menu
        .buildFromTemplate([{
          label: '重命名'
        }, {
          label: '选择'
        }, {
          label: '全选'
        }, {
          label: '删除'
        }])
      menu.popup(remote.getCurrentWindow())
    }
  },
  computed: {
    ...mapGetters(['curBucketName', 'curBucketFiles',
      'bucketLoading', 'buckets', 'bucketTableView', 'dirFiles', 'curPath',
      'appPrev', 'selected', 'ossArr', 'oss'])
  }
}
