<template>
    <div class="m-toolbar">
        <div class="toolbar-left">
            <input type="file" style="display: none;"
                   ref="upload" @change="uploadItems" multiple>
            <el-button icon="el-icon-upload2" @click="$refs.upload.click()">上传文件</el-button>
            <el-button icon="el-icon-download"
                       :disabled="selected.length === 0"
                       @click="downloadItems"
            >下载
            </el-button>
            <el-button icon="el-icon-delete"
                       :disabled="selected.length === 0"
                       @click="deleteItems"
            >删除
            </el-button>
            <!--<el-button icon="el-icon-folder-add">新建文件夹</el-button>-->
            <el-button icon="el-icon-download">离线下载</el-button>
        </div>
        <div class="toolbar-right">
            <i class="iconfont"
               v-if="bucketTableView"
               @click="setBucketTableView(!bucketTableView)"
            >&#xe72d;</i>
            <!--横线-->
            <i class="iconfont"
               v-else
               @click="setBucketTableView(!bucketTableView)"
            >&#xe7f4;</i>
        </div>
    </div>
</template>

<script>
  import appMixin from '@/mixins/app'

  export default {
    name: 'm-toolbar',
    mixins: [appMixin],
    methods: {
      uploadItems (event) {
        const {files} = event.target
        for (let file of files) {
          this.uploadItem(file)
        }
      },
      downloadItems () {
        this.selected.forEach(item => this.downloadItem(item))
        this.clearAllSelected()
      },
      async deleteItems () {
        await this.setBucketLoading(true)
        for (let item of this.selected) await this.deleteItem(item)
        await this.initBucket(this.curBucketName)
      }
    }
  }
</script>

<style scoped lang="scss">
    .m-toolbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;

        .toolbar-left {
        }

        .toolbar-right {
            cursor: default;

            i {
                font-size: 19px;
                cursor: pointer;
            }
        }
    }
</style>

<style>
    .upload-demo {
        display: inline-block;
    }
</style>
