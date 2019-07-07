<template>
    <div class="m-toolbar">
        <div class="toolbar-left">
            <el-button icon="el-icon-upload2" @click="selectFiles">上传</el-button>
            <el-button icon="el-icon-download" :disabled="selected.length === 0">下载</el-button>
            <el-button icon="el-icon-delete" :disabled="selected.length === 0">删除</el-button>
            <el-button icon="el-icon-folder-add">新建文件夹</el-button>
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
  import { remote } from 'electron'
  import appMixin from '@/mixins/app'

  export default {
    name: 'm-toolbar',
    mixins: [appMixin],
    methods: {
      selectFiles () {
        const dialogOptions = { properties: ['openFile', 'openDirectory', 'multiSelections'] }
        remote.dialog.showOpenDialog(dialogOptions)
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
