<template>
    <div class="m-header">
        <div class="header-left">
            <i class="el-icon-arrow-left"
               @click="prev"
               :class="[this.appPrev.length === 1 && 'disable' ]"
            ></i>
            <i class="el-icon-refresh-right"
               @click="refresh"></i>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="header-center">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in this.curPath.split('/')"
                                    :key="index"
                >{{item}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="header-right">
            <input v-model="search" placeholder="搜索文件"/>
            <i class="el-icon-search"></i>
        </div>
    </div>
</template>

<script>
  import appMixin from '@/mixins/app'

  export default {
    name: 'm-header',
    mixins: [appMixin],
    data () {
      return {
        search: ''
      }
    },
    methods: {
      async prev () {
        await this.popPrev()
        this.changeDirectory(this.curPath, false)
      },
      refresh () {
        this.initBucket(this.curBucketName)
      }
    }
  }
</script>

<style scoped lang="scss">
    .m-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10px;

        i {
            cursor: pointer;
            padding: 0 3px;
            color: #303133;

            &.disable {
                color: #C0C4CC;
                cursor: not-allowed;
            }
        }

        .header-left {
            cursor: default;
        }

        .header-center {
            flex: 1;
            cursor: default;
        }

        .header-right {
            input {
                border: none;
                padding-left: 5px;

                &:focus {
                    box-shadow: none;
                    border-color: #fff;
                    outline: 0;
                    background: #fff;
                }
            }
        }
    }
</style>
