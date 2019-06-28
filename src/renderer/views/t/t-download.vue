<template>
    <div class="t-download">
        <div class="download-header">
            <div class="header-progress">
                <span>下载总进度</span>
            </div>
            <div>123</div>
        </div>
        <virtual-list class="download-list" v-if="downloads.length > 0" :size="40" :remain="8">
            <item v-for="(item, index) of downloads" :key="index" :item="item">
                <el-progress
                        :text-inside="true"
                        :stroke-width="15"
                        :percentage="status.find(i=>i.uuid === item.uuid) | percentageFilter"
                        style="width: 250px;"
                ></el-progress>
            </item>
        </virtual-list>
        <div v-else class="none-list">
            <i class="el-icon-download"></i>
            <span>当前没有传输记录~</span>
        </div>
    </div>
</template>

<script>
  import { ipcRenderer } from 'electron'

  import VirtualList from 'vue-virtual-scroll-list'
  import Item from './item'
  import transferMixin from '@/mixins/transfer'

  export default {
    name: 't-download',
    components: { VirtualList, Item },
    mixins: [transferMixin],
    data () {
      return {
        status: []
      }
    },
    filters: {
      percentageFilter: value => value && value.progress
    },
    mounted () {
      ipcRenderer.on('download progress', (event, status) => {
        const index = this.status.findIndex(i => i.uuid === status.uuid)
        if (index < 0) {
          this.status.push(status)
        } else {
          this.$set(this.status[index], 'progress', status.progress)
        }
      })
    }
  }
</script>

<style scoped lang="scss">
    .t-download {
        height: 100%;
        display: flex;
        flex-direction: column;

        .download-header {
            height: 35px;
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px #ebeef5 solid;
            padding: 0 20px;
            justify-content: space-between;

            .header-progress {
                width: 200px;
                display: flex;
                flex-direction: row;
            }
        }

        .download-list {
            flex: 1;
        }

        .none-list {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            i {
                font-size: 80px;
                color: #909399;
                padding-bottom: 30px;
            }

            span {
                font-size: 15px;
            }
        }
    }
</style>
