<template>
    <div class="list-item">
        <div class="item-file-meta">
            <icon class="item-file-icon" :postfix="item.type"></icon>
            <div class="item-file-detail">
                <div class="file-name">{{item.name}}</div>
                <div class="file-size">{{item.size | sizeFormatter}}</div>
            </div>
        </div>
        <div class="item-file-time">{{item.uploadTime | timeFormatter}}</div>
        <div class="item-file-status">
            <slot></slot>
        </div>
        <div class="item-file-button">
            <el-button type="text" icon="el-icon-folder"></el-button>
            <el-button type="text" icon="el-icon-delete"></el-button>
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
            width: 250px;

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
                    line-height: 1.3;
                    color: #606266;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
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

        .item-file-button {
            cursor: default;
        }
    }
</style>
