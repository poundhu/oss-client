<template>
    <div class="t-upload">
        <div class="upload-header">
            <div>共上传 <span class="blue">{{uploads.length}}</span> 个文件</div>
        </div>
        <virtual-list class="upload-list" v-if="uploads.length > 0" :size="40" :remain="8">
            <item v-for="(item, index) of uploads" :key="index" :item="item"></item>
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
  import transferMixin from '@/mixins/transfer'

  export default {
    name: 't-upload',
    components: { VirtualList, Item },
    mixins: [transferMixin]
  }
</script>

<style scoped lang="scss">
    .t-upload {
        height: 100%;
        display: flex;
        flex-direction: column;

        .upload-header {
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
