<template>
  <div class="m-main-table">
    <el-table ref="table"
              :data="currentBucket.children"
              tooltip-effect="dark"
              height="100%"
              v-loading="bucketLoading"
              @row-dblclick="dblClickItem"
              @row-click="clickItem"
              @row-contextmenu="contextMenu"
              @selection-change="tableSelectionChange"
              :row-class-name="tableClassName"
              resizable
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column sortable prop="key" label="文件名" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="file-title">
            <icon class="file-icon"
                  :postfix="scope.row.ext"
                  :isFolder="scope.row.isFolder"
            ></icon>
            <span>{{scope.row.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="putTime" width="200"
                       label="修改时间" :formatter="modifyTimeFormatter">
      </el-table-column>
      <el-table-column sortable prop="fsize" label="大小"
                       :formatter="fileSizeFormatter" width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import appMixin from '@/mixins/app'
  import { formatFileSize } from '@/assets/script/utils'
  import Icon from '@/components/icon'

  export default {
    components: { Icon },
    mixins: [appMixin],
    watch: {
      selected (selected) {
        this.$refs.table.clearSelection()
        selected.forEach(item => this.$refs.table.toggleRowSelection(item, true))
      }
    },
    data () {
      return {
        multipleSelection: [],
        modifyTimeFormatter: row => row.isFolder ? '' : row.updatedTime,
        fileSizeFormatter: row => row.isFolder ? '' : formatFileSize(row.size),
        tableClassName: ({ row }) => this.selected.findIndex(i => i.uuid === row.uuid) >= 0 ? 'current-row' : ''
      }
    },
    methods: {
      tableSelectionChange (selected) {
        selected.forEach(i => this.addSelectedItem(i.uuid))
      }
    },
    mounted () {
      this.clearAllSelected()
      this.$refs['table'].clearSelection()
    }
  }
</script>

<style scoped lang="scss">
  .m-main-table {
    overflow: auto;
    height: 100%;

    .file-title {
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .file-icon {
        width: 20px;
        height: 20px;
      }

      span {
        cursor: default;
        padding-left: 10px;
      }
    }
  }
</style>
