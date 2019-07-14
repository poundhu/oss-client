import { mapActions, mapGetters } from 'vuex'
import { clipboard, ipcRenderer, remote } from 'electron'
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
      this.clearAllSelected()
      this.addSelectedItem(hash)
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
            const fileUrl = this.getFileLink(file)
            clipboard.writeText(fileUrl)
          }
        }, {
          label: '复制链接（markdown）',
          click: () => {
            const fileUrl = this.getFileLink(file)
            clipboard.writeText(`![${file.key}](${fileUrl})`)
          }
        }, { type: 'separator' }, {
          label: '下载',
          click: () => {
            this.downloadItem(file)
          }
        }, {
          label: '删除',
          click: async () => {
            try {
              await this.setBucketLoading(true)
              await this.oss.remove(this.curBucketName, file.key)
              await this.initBucket(this.curBucketName)
            } catch (e) {
              this.$message.error(e.toString())
            }
          }
        }])
      menu.popup(remote.getCurrentWindow())
    },
    getFileLink (file) {
      if (this.oss.domain.length > 0) {
        return url.format({
          protocol: 'http:',
          host: this.oss.domain[0],
          pathname: encodeURI(file.key)
        }).toString()
      } else {
        this.$notify.error({ title: '自定义位置', message: '没有绑定域名', position: 'bottom-right', offset: 30 })
        throw new Error('没有绑定域名')
      }
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
    },
    downloadItem (file) {
      const fileUrl = this.getFileLink(file)
      const uuid = uuidV1()
      const transferFile = { uuid, ...file }
      this.pushDownload(transferFile)
      ipcRenderer.send('download', {
        url: fileUrl,
        properties: { directory: remote.app.getPath('downloads'), uuid }
      })
    },
    async uploadItem (file) {
      const uuid = uuidV1()
      this.pushUpload({ uuid, putTime: file.lastModified, fsize: file.size, mimeType: file.type, key: file.name })
      const done = await this.oss.upload(this.curBucketName, file, file.name, uuid)
      this.removeUpload(done)
    }
  },
  computed: {
    ...mapGetters(['curBucketName', 'curBucketFiles',
      'bucketLoading', 'buckets', 'bucketTableView', 'dirFiles', 'curPath',
      'appPrev', 'selected', 'ossArr', 'oss'])
  }
}
