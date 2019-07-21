import path from 'path'

import { mapActions, mapGetters } from 'vuex'
import { clipboard, ipcRenderer, remote } from 'electron'
import uuidV1 from 'uuid/v1'
import moment from 'moment'
import mime from 'mime'

import Creator from '@/assets/script/oss'

const Menu = remote.Menu

/**
 * File
 * name: 文件名
 * size：文件大小
 * type：文件类型
 * uuid: 唯一id
 * uploadTime: 上传时间
 * remotePath：远程路径（以 / 开头）
 * meta：原始数据
 *
 * Folder
 * name： 文件夹名
 * isFolder： 文件夹
 * path： 路径
 */

export default {
  methods: {
    ...mapActions(['setCurBucket', 'setBucketFiles',
      'setBuckets', 'setBucketLoading', 'setBucketTableView', 'setDirFiles', 'pushPrev',
      'popPrev', 'addSelectedItem', 'removeSelectedItem', 'selectAllItem',
      'clearAllSelected', 'setOSS', 'addOSS', 'pushDownload', 'pushUpload', 'removeUpload',
      'clearPrev']),
    async initBuckets () {
      // 初始化所有的 bucket
      const buckets = await this.oss.buckets()
      await this.clearPrev()
      await this.setBuckets(buckets)
      await this.initBucket(this.curBucketName || buckets[0])
      const curPath = '/'
      await this.changeDirectory(curPath)
      this.pushPrev({ path: curPath, name: path.basename(curPath) })
    },
    async initBucket (bucket) {
      await this.clearAllSelected()
      await this.setBucketLoading(true)
      const { items } = await this.oss.bucketFiles(bucket)
      const files = items.map(i => ({
        name: i.key.split('/').pop(),
        size: i.fsize,
        type: i.key.split('.').pop(),
        uuid: i.hash,
        uploadTime: moment(i.putTime / 1e4).format('YYYY-MM-DD HH:mm:ss'),
        remotePath: path.normalize(`${i.key.indexOf('/') === 0 ? '' : '/'}${i.key}`),
        meta: i
      }))
      await this.setBucketFiles({ name: bucket, files })
      await this.setCurBucket(bucket)
      await this.setBucketLoading(false)
    },
    changeDirectory (curPath) {
      let dirFiles = []
      for (let file of this.curBucketFiles) {
        if (file.remotePath.indexOf(curPath) === 0) {
          let key = file.remotePath.slice(curPath.length, file.remotePath.length)
          const pathArr = key.split('/')
          if (pathArr.length === 1) {
            dirFiles.push(file)
          } else {
            if (dirFiles.findIndex(i => i.path === `${pathArr[0]}/`) < 0) {
              dirFiles.push({ isFolder: true, path: `${pathArr[0]}/`, name: pathArr[0] })
            }
          }
        }
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
    contextMenu ({ isFolder, uuid }) {
      if (isFolder) {
        this.openFolderContextMenu(uuid)
      } else {
        this.openFileContextMenu(uuid)
      }
    },
    dblClickItem (item) {
      if (item.isFolder) {
        const curPath = path.join(this.curPath, item.path)
        this.changeDirectory(curPath)
        this.pushPrev({ path: curPath, name: path.basename(curPath) })
      }
    },
    clickItem (item) {
      this.clearAllSelected()
      this.addSelectedItem(item.uuid)
    },
    openFileContextMenu (uuid) {
      this.clearAllSelected()
      this.addSelectedItem(uuid)
      const file = this.curBucketFiles.find(i => i.uuid === uuid)
      const menu = Menu
        .buildFromTemplate([{
          label: '全选',
          click: () => {
            this.selectAllItem()
          }
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
            await this.setBucketLoading(true)
            await this.deleteItem(file)
            await this.initBucket(this.curBucketName)
          }
        }])
      menu.popup(remote.getCurrentWindow())
    },
    getFileLink (file) {
      if (this.oss.domain.length > 0) {
        const protocol = 'http'
        return `${protocol}://${this.oss.domain[0]}/${file.meta.key}`
      } else {
        this.$notify.error({ title: '自定义位置', message: '没有绑定域名', position: 'bottom-right', offset: 30 })
        throw new Error('没有绑定域名')
      }
    },
    openFolderContextMenu (uuid) {
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
      const downloadId = uuidV1()
      const transferFile = { downloadId, ...file }
      this.pushDownload(transferFile)
      ipcRenderer.send('download', {
        url: fileUrl,
        properties: { directory: remote.app.getPath('downloads'), downloadId }
      })
    },
    async uploadItem (file) {
      const uploadId = uuidV1()
      const item = {
        uploadId,
        uploadTime: file.lastModified,
        name: file.name,
        size: file.size,
        type: mime.getExtension(file.type)
      }
      this.pushUpload(item)
      const remotePath = `${path.join(this.curPath, file.name)}`
      await this.oss.upload(this.curBucketName, file, remotePath, uploadId)
      this.removeUpload(uploadId)
    },
    async deleteItem (file) {
      try {
        await this.oss.remove(this.curBucketName, file.meta.key)
      } catch (e) {
        this.$message.error(e.toString())
      }
    }
  },
  computed: {
    ...mapGetters(['curBucketName', 'curBucketFiles',
      'bucketLoading', 'buckets', 'bucketTableView', 'dirFiles', 'curPath',
      'appPrev', 'selected', 'ossArr', 'oss'])
  }
}
