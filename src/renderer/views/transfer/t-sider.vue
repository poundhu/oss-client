<template>
    <div class="m-sider">
        <div class="actions">
            <div class="item"
                 :class="[ index === tActive ? 'active' : '' ]"
                 @click="setTActive(index)"
                 v-for="(item, index) in actions"
                 :key="index">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import transferMixin from '@/mixins/transfer'

  export default {
    name: 'm-sider',
    mixins: [transferMixin],
    data () {
      return {
        actions: [
          { title: '正在下载', icon: 'el-icon-download' },
          { title: '正在上传', icon: 'el-icon-upload2' },
          { title: '传输完成', icon: 'el-icon-check' }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
    .m-sider {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #f9fafb;

        .actions {
            margin-top: 5px;

            .item {
                height: 35px;
                font-size: 14px;
                cursor: default;
                border-left: 3px transparent solid;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: flex;
                align-items: center;
                padding-left: 15px;

                i {
                    font-size: 14px;
                    padding-right: 8px;
                }

                &:hover {
                    background: #e0f2fb;

                    i {
                        color: #35cefc;
                    }

                    span {
                        color: #35cefc;
                    }
                }

                &.active {
                    background: #e0f2fb;
                    border-left: 3px #06a8ff solid;

                    i {
                        color: #35cefc;
                    }

                    span {
                        color: #35cefc;
                    }
                }
            }
        }
    }
</style>
