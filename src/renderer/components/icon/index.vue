<template>
    <div class="the-icon">
        <el-image class="icon" :src="src"
                  v-if="showImg && isImage(postfix)" fit="cover"
        ></el-image>
        <svg class="icon" aria-hidden="true" v-else>
            <use :xlink:href="iconStr"></use>
        </svg>
    </div>
</template>

<script>
  import './font/iconfont'

  const postfixList = ['sql', 'sketch', 'psd', 'apk', 'xls',
    'ai', 'otf', 'mp3', 'jpg', 'doc', 'dmg', 'mov', 'iso', 'flv', 'exe', 'wav',
    'ppt', 'html', 'pdf', 'png', 'avi', 'css', 'zip', 'log', 'gif', 'php', 'js']
  const postfixImage = ['jpg', 'png', 'jpeg']

  export default {
    name: 'index',
    props: {
      postfix: {
        type: String,
        default: ''
      },
      isFolder: {
        type: Boolean,
        default: false
      },
      // 如果 showImage 为 true ， domain 必填
      showImg: {
        type: Boolean,
        default: false
      },
      domain: {
        type: String,
        default: ''
      },
      meta: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      iconStr () {
        if (this.isFolder) {
          return '#icon-wenjian'
        } else if (postfixList.indexOf(this.postfix) > 0) {
          return `#icon-${this.postfix}`
        } else if (this.postfix === 'xlsx') {
          return '#icon-xls'
        } else if (this.postfix === 'pptx') {
          return '#icon-ppt'
        } else if (this.postfix === 'docx') {
          return '#icon-doc'
        } else if (this.postfix === 'mp4') {
          return '#icon-movie'
        } else if (this.postfix === 'jpeg') {
          return '#icon-jpg'
        } else {
          return '#icon-documents'
        }
      },
      src () {
        return `http://${this.domain}/${this.meta.key}`
      }
    },
    methods: {
      isImage () {
        const postfix = this.postfix.split('.').pop()
        return postfixImage.indexOf(postfix) >= 0
      }
    }
  }
</script>

<style scoped lang="scss">
    .the-icon {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;

        .icon {
            fill: currentColor;
            width: inherit;
            height: inherit;
            overflow: hidden;
        }
    }
</style>
