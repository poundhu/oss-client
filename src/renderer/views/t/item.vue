<template>
    <div class="list-item">
        <div class="item-file-meta">
            <icon class="item-file-icon"></icon>
            <div class="item-file-detail">
                <div class="file-name">{{item.key}}</div>
                <div class="file-size">{{item.fsize | sizeFormatter}}</div>
            </div>
        </div>
        <div class="item-file-time">{{item.putTime | timeFormatter}}</div>
        <div class="item-file-status">
            <slot></slot>
        </div>
        <div class="item-file-button">
            <el-button type="text">打</el-button>
            <el-button type="text">打</el-button>
            <el-button type="text">清</el-button>
        </div>
    </div>
</template>

<script>
  import moment from 'moment'

  import Icon from '@/components/icon'
  import { formatFileSize } from '@/assets/script/utils'

  export default {
    name: 'Item',
    components: { Icon },
    filters: {
      timeFormatter: (value) => moment(value / 1e4).format('YYYY-MM-DD HH:mm:ss'),
      sizeFormatter: value => formatFileSize(value)
    },
    props: {
      item: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped lang="scss">
    .list-item {
        height: 57px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px #ebeef5 solid;
        padding: 0 20px;
        justify-content: space-between;

        .item-file-meta {
            display: flex;
            flex-direction: row;

            .item-file-icon {
                height: 30px;
                width: 30px;
                padding-right: 10px;
            }

            .item-file-detail {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .file-name {
                    font-size: 13px;
                    color: #606266;
                }

                .file-size {
                    font-size: 13px;
                    color: #909399;
                }
            }
        }

        .item-file-time {
            font-size: 13px;
            color: #909399;
        }

        .item-file-status {
            font-size: 13px;
            color: #909399;
        }
    }
</style>
