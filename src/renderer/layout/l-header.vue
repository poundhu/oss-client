<template>
  <div class="m-header">
    <div class="header-logo">
      <span>LOGO</span>
    </div>
    <div class="header--wrapper">
      <div class="header-action">
        <router-link class="header-action__button"
                     v-for="(item, index) in pages"
                     :to="item.link"
                     :key="index">
          <el-badge :value="downloads.length + uploads.length"
                    :hidden="index !== 1 || downloads.length + uploads.length === 0">
            <span>{{item.name}}</span>
          </el-badge>
        </router-link>
      </div>
      <div class="header-button">
        <el-dropdown trigger="click" size="medium"
                     @command="dropdownCmd"
                     class="button-change-bucket">
          <div class="el-dropdown-link">
            <span>选择云存储</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in ossConfigList" :key="index" :command="'switch:' + item.ak">
              <div class="select-item" :class="['oss.ak' === item.ak ? 'active' :'']">
                <svg aria-hidden="true">
                  <use :xlink:href="originOptions.find(i=>i.value === item.origin).icon"></use>
                </svg>
                <div>{{originOptions.find(i=>i.value === item.origin).label}}</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided command="add">
              <div class="select-item">
                <i class="el-icon-circle-plus-outline"></i>
                <div>添加</div>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider direction="vertical" v-if="!isMac"></el-divider>
        <div class="button-base" v-show="!isMac">
          <i class="iconfont" @click="minimize">&#xe7fd;</i>
          <i class="iconfont" @click="maximize" v-if="!maximizeStatus">&#xe60f;</i>
          <i class="iconfont" @click="unmaximize" v-else>&#xe601;</i>
          <i class="iconfont" @click="close">&#xe7fc;</i>
        </div>
      </div>
    </div>

    <!--添加云存储-->
    <el-dialog title="选择云存储" :visible.sync="addFormDialogVisible">
      <el-form label-position="right" ref="addForm" :rules="addFormRules" label-width="95px" :model="addForm">
        <el-form-item label="云存储" prop="origin">
          <el-select v-model="addForm.origin" placeholder="请选择">
            <el-option
              v-for="item in originOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <div class="select-item">
                <svg aria-hidden="true">
                  <use :xlink:href="item.icon"></use>
                </svg>
                <div>{{ item.label }}</div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="AccessKey" prop="ak">
          <el-input v-model="addForm.ak"></el-input>
        </el-form-item>
        <el-form-item label="SecretKey" prop="sk">
          <el-input v-model="addForm.sk"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormCancel">取 消</el-button>
        <el-button type="primary" @click="addFormConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import os from 'os'
  import localforage from 'localforage'
  import { remote } from 'electron'

  import appMixin from '@/mixins/app'
  import transferMixin from '@/mixins/transfer'

  export default {
    name: 'm-header',
    mixins: [appMixin, transferMixin],
    data () {
      return {
        isMac: os.platform() === 'darwin',
        maximizeStatus: false,
        pages: [
          { link: '/m', name: '首页' },
          { link: '/t', name: '传输列表' },
          { link: '/s', name: '设置' }
        ],
        ossConfigList: [],
        addFormDialogVisible: false,
        addForm: { ak: '', sk: '', origin: '' },
        addFormRules: {
          origin: [{ required: true, message: '请选择云存储类型', trigger: 'blur' }],
          ak: [{ required: true, message: '请输入 AccessKey', trigger: 'blur' }],
          sk: [{ required: true, message: '请输入 SecretKey', trigger: 'blur' }]
        },
        originOptions: [
          { label: '七牛云', value: 'qiniu', icon: '#icon-qiniuyun1' },
          { label: '腾讯云', value: 'tencent', icon: '#icon-tengxunyun' },
          { label: '阿里云', value: 'aliyun', icon: '#icon-aliyun-logo' },
          { label: '青云', value: 'qing', icon: '#icon-qingyun' },
          { label: '又拍云', value: 'upai', icon: '#icon-upyun' }
        ]
      }
    },
    methods: {
      minimize () {
        remote.getCurrentWindow().minimize()
      },
      maximize () {
        this.maximizeStatus = true
        remote.getCurrentWindow().maximize()
      },
      unmaximize () {
        this.maximizeStatus = false
        remote.getCurrentWindow().unmaximize()
      },
      close () {
        remote.getCurrentWindow().hide()
      },
      // 添加表单
      dropdownCmd (cmd) {
        const cmdArr = cmd.split(':')
        if (cmdArr[0] === 'switch') {
          const oss = this.ossArr.find(i => i.ak === cmdArr[1])
          this.initOSS(oss)
        } else {
          this.addFormDialogVisible = true
        }
      },
      addFormConfirm () {
        this.$refs['addForm'].validate(async (valid) => {
          if (valid) {
            localforage.getItem('ossConfigList')
              .then(val => {
                if (!(val instanceof Array)) val = []
                const newConfig = Object.assign({}, this.addForm)
                if (val.length === 0 || val.findIndex(item => item.ak === newConfig.ak) < 0) {
                  val.push(newConfig)
                  return localforage.setItem('ossConfigList', val)
                }
                return newConfig
              })
              .then(config => {
                // await this.initOSS(this.addForm)
                this.addFormDialogVisible = false
              })
          }
        })
      },
      addFormCancel () {
        this.$refs['addForm'].resetFields()
        this.addFormDialogVisible = false
      },
      initBucketList () {
        // 初始化「云存储配置」列表
        localforage.getItem('ossConfigList').then(val => {
          if (!(val instanceof Array)) val = []
          this.ossConfigList = val
        })
      }
    },
    mounted () {

    }
  }
</script>

<style scoped lang="scss">
  .m-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #eef0f6;
    border-bottom: 1px solid #dcdfe6;
    -webkit-app-region: drag;

    .header-logo {
      width: 165px;
      text-align: center;

      span {
        width: 130px;
        display: inline-block;
        font-size: 30px;
        color: #06a8ff;
        cursor: default;
      }
    }

    .header--wrapper {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      .header-action {
        display: flex;
        flex-direction: row;

        .header-action__button {
          cursor: default;
          height: 38px;
          line-height: 38px;
          font-size: 13px;
          margin: 0 15px;
          border-bottom: 2px solid transparent;
          text-decoration: none;
          -webkit-app-region: no-drag;
          color: #303133;

          &:hover {
            color: #06a8ff;
          }

          &.page-active {
            color: #06a8ff;
            border-bottom: 2px solid #06a8ff;
          }
        }
      }

      .header-button {
        display: flex;
        flex-direction: row;

        .button-change-bucket {
          -webkit-app-region: no-drag;
          cursor: default;
          font-size: 13px;

          .el-dropdown-link {
            span:hover {
              color: #06a8ff;
            }
          }
        }

        .button-base {
          cursor: default;

          i {
            -webkit-app-region: no-drag;

            &:hover {
              color: #06a8ff;
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .select-item {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      width: 20px;
      height: 20px;
    }

    div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &.active {
      color: #06a8ff;
    }
  }
</style>
