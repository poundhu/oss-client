<template>
    <div class="layout-setting">
        <div class="s-sider">
            <div class="actions">
                <div class="item"
                     :class="[ active === index && 'active' ]"
                     v-for="(item, index) in settings"
                     :key="index"
                     @click="toAnchor(index)">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
        <div class="s-main" ref="container">
            <div class="settings" v-for="(item, index) in settings" :key="index">
                <div v-if="index === 0">
                    <el-divider content-position="left">{{item.title}}</el-divider>
                    <el-form label-width="300px" label-position="left">
                        <el-form-item label="支持https：">
                            <el-switch active-color="#13ce66"></el-switch>
                        </el-form-item>
                        <el-form-item label="直接删除，不显示确认框：">
                            <el-switch active-color="#13ce66"></el-switch>
                        </el-form-item>
                        <el-form-item label="直接上传，不显示确认框：">
                            <el-switch active-color="#13ce66"></el-switch>
                        </el-form-item>
                        <el-form-item label="如果文件存在，是否直接上传：">
                            <el-switch active-color="#13ce66"></el-switch>
                        </el-form-item>
                        <el-form-item label="复制到粘贴板格式：">
                            <el-radio-group>
                                <el-radio :label="3">备选项</el-radio>
                                <el-radio :label="6">备选项</el-radio>
                                <el-radio :label="9">备选项</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="主题：">
                            <el-radio-group>
                                <el-radio :label="3">备选项</el-radio>
                                <el-radio :label="6">备选项</el-radio>
                                <el-radio :label="9">备选项</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else-if="index === 1">
                    <el-divider content-position="left">{{item.title}}</el-divider>
                    <el-form label-width="300px" label-position="left">
                        <el-form-item label="支持https：">
                            <el-switch active-color="#13ce66"></el-switch>
                        </el-form-item>
                        <el-form-item label="直接删除，不显示确认框：">
                            <el-switch active-color="#13ce66"></el-switch>
                        </el-form-item>
                        <el-form-item label="直接上传，不显示确认框：">
                            <el-switch active-color="#13ce66"></el-switch>
                        </el-form-item>
                        <el-form-item label="如果文件存在，是否直接上传：">
                            <el-switch active-color="#13ce66"></el-switch>
                        </el-form-item>
                        <el-form-item label="复制到粘贴板格式：">
                            <el-radio-group>
                                <el-radio :label="3">备选项</el-radio>
                                <el-radio :label="6">备选项</el-radio>
                                <el-radio :label="9">备选项</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="主题：">
                            <el-radio-group>
                                <el-radio :label="3">备选项</el-radio>
                                <el-radio :label="6">备选项</el-radio>
                                <el-radio :label="9">备选项</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else-if="index === 3">
                    <el-divider content-position="left">{{item.title}}</el-divider>
                    <el-form label-width="300px" label-position="left">
                        <el-form-item :label="item.title" v-for="(item, index) in versions"
                                      :key="index">
                            <span>{{item.version}}</span>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else-if="index === 2">
                    <el-divider content-position="left">{{item.title}}</el-divider>
                    <el-form label-width="300px" label-position="left">
                        <el-form-item :label="item.title" v-for="(item, index) in links"
                                      :key="index">
                            <span style="cursor: pointer;" @click="open(item.link)">{{item.link}}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div style="height:200px;"></div>
        </div>
    </div>
</template>

<script>
  import { remote } from 'electron'

  export default {
    name: 'index',
    data () {
      return {
        active: 0,
        versions: [
          { title: '操作系统', version: require('os').platform() },
          { title: 'electron 版本', version: process.versions.electron },
          { title: 'node 版本', version: process.versions.node },
          { title: 'vue 版本', version: require('vue/package.json').version },
          { title: 'app 版本', version: remote.app.getVersion() }
        ],
        settings: [
          { title: '全局设置', icon: 'el-icon-setting' },
          { title: '托盘设置', icon: 'el-icon-warning-outline' },
          { title: '链接', icon: 'el-icon-warning-outline' },
          { title: '关于', icon: 'el-icon-warning-outline' }
        ],
        links: [
          { title: '项目地址', link: 'https://github.com/caorushizi/oss-client' }
        ]
      }
    },
    methods: {
      toAnchor (index) {
        const settings = this.$refs['container'].querySelectorAll('.settings')
        const top = settings[index].offsetTop - 76 - 24
        this.$refs['container'].scrollTo({ top, behavior: 'smooth' })
      },
      onScroll (evt) {
        const container = this.$refs['container']
        const anchors = container.querySelectorAll('.settings')
        this.active = Array.from(anchors).findIndex(i => i.offsetTop - 76 - 24 > evt.target['scrollTop']) - 1
        if (container.scrollTop + container.clientHeight === container.scrollHeight) {
          this.active = this.settings.length - 1
        }
      },
      open (link) {
        remote.shell.openExternal(link)
      }
    },
    mounted () {
      this.$refs['container'].addEventListener('scroll', this.onScroll)
    }
  }
</script>

<style scoped lang="scss">
    .layout-setting {
        display: flex;

        .s-sider {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #f9fafb;
            width: 165px;
            border-right: 1px solid #dcdfe6;

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

        .s-main {
            flex: 1;
            padding: 0 24px;
            overflow-y: auto;
        }
    }
</style>
