<template>
    <div class="m-main-table">
        <el-table ref="multipleTable"
                  :data="dirFiles"
                  tooltip-effect="dark"
                  height="100%"
                  v-loading="bucketLoading"
                  @row-dblclick="dblClick"
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
                              :postfix="scope.row.key"
                              :isFolder="scope.row.isFolder"
                        ></icon>
                        <span>{{scope.row.key.split('/').pop()}}</span>
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
  import moment from 'moment'

  import appMixin from '@/mixins/app'
  import { formatFileSize } from '@/assets/script/utils'
  import Icon from '@/components/icon'

  export default {
    components: { Icon },
    mixins: [appMixin],
    data () {
      return {
        multipleSelection: [],
        modifyTimeFormatter: (row, column, cellValue) => moment(cellValue / 1e4).format('YYYY-MM-DD HH:mm:ss'),
        fileSizeFormatter: (row, column, cellValue) => formatFileSize(cellValue),
        tableClassName: ({ row }) => this.selected.findIndex(i => i.hash === row.hash) >= 0 ? 'current-row' : ''
      }
    },
    methods: {
      tableSelectionChange (selection) {
        this.clearAllSelected()
        selection.forEach(i => this.addSelectedItem(i.hash))
      }
    },
    mounted () {
      this.clearAllSelected()
      this.$refs['multipleTable'].clearSelection()
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
