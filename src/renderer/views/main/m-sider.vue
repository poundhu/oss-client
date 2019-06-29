<template>
    <div class="m-sider">
        <div class="buckets">
            <div
                    class="item"
                    :class="[curBucketName === item ? 'active' : '']"
                    @click="initBucket(item)"
                    v-for="(item, index) in buckets"
                    :key="index">
                <i class="el-icon-folder-opened"></i>
                <span>{{item}}</span>
            </div>
        </div>
        <div class="sider-bottom">
            <div class="ad">
                <img draggable="false" src="../../assets/images/ad.png" alt="扫码">
            </div>
            <div class="progress">
                <el-progress :percentage="20" color="#06a8ff" :show-text="false"></el-progress>
                <div class="progress-text">447G/5140G</div>
            </div>
        </div>
    </div>
</template>

<script>
  import appMixin from '@/mixins/app'

  export default {
    name: 'm-sider',
    mixins: [appMixin]
  }
</script>

<style scoped lang="scss">
    .m-sider {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #f9fafb;

        .buckets {
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

        .sider-bottom {
            .progress {
                margin: 10px;
            }

            .progress-text {
                margin-top: 10px;
                color: #909399;
                font-size: 12px;
            }
        }
    }
</style>
