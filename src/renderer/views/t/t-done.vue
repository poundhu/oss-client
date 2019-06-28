<template>
    <div class="t-done">
        <div class="done-header">
            <div>共传输<span class="blue">{{1}}</span>个文件</div>
            <el-button>清除所有记录</el-button>
        </div>
        <virtual-list class="done-list" v-if="items.length > 0" :size="40" :remain="8">
            <item v-for="(item, index) of items" :key="index"></item>
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

  export default {
    name: 't-done',
    components: { VirtualList, Item },
    data () {
      return {
        items: []
      }
    }
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
