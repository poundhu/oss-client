<template>
    <div class="t-upload">
        <div class="upload-header">
            header
        </div>
        <virtual-list class="upload-list" v-if="items.length > 0" :size="40" :remain="8">
            <item v-for="(item, index) of items" :key="index"></item>
        </virtual-list>
        <div v-else class="none-list">
            <i class="el-icon-upload2"></i>
            <span>当前没有传输记录~</span>
        </div>
    </div>
</template>

<script>
  import VirtualList from 'vue-virtual-scroll-list'
  import Item from './item'

  export default {
    name: 't-upload',
    components: { VirtualList, Item },
    data () {
      return {
        items: []
      }
    }
  }
</script>

<style scoped lang="scss">
    .t-upload {
        height: 100%;
        display: flex;
        flex-direction: column;

        .upload-header {
            height: 35px;
            padding: 0 20px;
            border-bottom: 1px #ebeef5 solid;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .upload-list {
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
