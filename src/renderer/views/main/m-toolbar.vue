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
            <el-button icon="el-icon-folder-add" @click="mkdirDialogVisible = true">新建文件夹</el-button>
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

        <el-dialog title="新建文件夹" :visible.sync="mkdirDialogVisible">
            <el-form :model="mkdirForm" status-icon
                     :rules="mkdirFormRules" ref="mkdirForm" label-width="100px"
            >
                <el-form-item label="文件夹名称" prop="dirName">
                    <el-input v-model="mkdirForm.dirName"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="mkdirDialogVisible = false">取 消</el-button>
                <el-button type="primary" :loading="mkdirFormConfirmLoading"
                           @click="mkdirConfirm">确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import appMixin from '@/mixins/app'

  export default {
    name: 'm-toolbar',
    mixins: [appMixin],
    data () {
      return {
        mkdirDialogVisible: false,
        mkdirFormConfirmLoading: false,
        mkdirForm: { dirName: '新建文件夹' },
        mkdirFormRules: {
          dirName: [
            { required: true, message: '文件夹名称不能为空', trigger: 'blur' },
            { min: 3, max: 25, message: '文件夹名称长度应该在3到25个字符', trigger: 'blur' }]
        }
      }
    },
    methods: {
      mkdirConfirm () {
        this.$refs.mkdirForm
          .validate(async (valid) => {
            if (!valid) return false

            try {
              this.mkdirFormConfirmLoading = true
              const name = `${this.mkdirForm.dirName}/.o_c`
              await this.uploadItem({ name })
              this.$message.success('创建文件夹成功')
            } catch (e) {
              this.$message.error(e.message)
            } finally {
              this.mkdirDialogVisible = false
              this.$refs.mkdirForm.resetFields()
              this.mkdirFormConfirmLoading = false
            }
          })
      },
      uploadItems (event) {
        const { files } = event.target
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
