<template>
    <div class="t-done">
        <div class="done-header">
            <div>共传输<span class="blue">{{done.length}}</span>个文件</div>
            <el-button @click="clearDone()">清除所有记录</el-button>
        </div>
        <virtual-list class="done-list" v-if="done.length > 0" :size="40" :remain="8">
            <item v-for="(item, index) in done" :key="index" :item="item">
                <div>
                    <i class="el-icon-download"></i>
                    <span>下载完成</span>
                </div>
            </item>
        </virtual-list>
        <div v-else class="none-list">
            <i class="el-icon-time"></i>
            <span>当前没有传输记录~</span>
        </div>
    </div>
</template>

<script>
  import VirtualList from 'vue-virtual-scroll-list'

  import Item from './item'
  import transferMixin from '@/mixins/transfer'

  export default {
    name: 't-done',
    components: { VirtualList, Item },
    mixins: [transferMixin]
  }
</script>

<style scoped lang="scss">
    .t-done {
        height: 100%;
        display: flex;
        flex-direction: column;

        .done-header {
            height: 35px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px #ebeef5 solid;
            padding: 0 20px;
            font-size: 15px;

            .blue {
                color: #06a8ff;
            }
        }

        .done-list {
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
