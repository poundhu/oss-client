<template>
    <div class="suspension">
        <div class="logo"></div>
        <div class="content_body">
            <div class="upload">拖拽上传</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'suspension',
    mounted () {
      let win = this.$electron.remote.getCurrentWindow()
      let biasX = 0
      let biasY = 0
      let that = this
      document.addEventListener('mousedown', function (e) {
        switch (e.button) {
          case 0:
            biasX = e.x
            biasY = e.y
            document.addEventListener('mousemove', moveEvent)
            break
          case 2:
            that.$electron.ipcRenderer.send('createSuspensionMenu')
            break
        }
      })
      document.addEventListener('mouseup', function () {
        biasX = 0
        biasY = 0
        document.removeEventListener('mousemove', moveEvent)
      })

      function moveEvent (e) {
        win.setPosition(e.screenX - biasX, e.screenY - biasY)
      }
    }
  }
</script>

<style scoped lang="scss">
    .suspension {
        -webkit-user-select: none;
        cursor: default;
        overflow: hidden;
        height: 25px;
        border-radius: 4px;
        display: flex;
        border: 1px solid #06a8ff;

        .upload {
            height: 25px;
            line-height: 25px;
            font-size: 12px;
            text-align: center;
            color: #06a8ff;
        }

        .logo {
            width: 40px;
            background: #06a8ff url("../../assets/images/logo.png") no-repeat center;
            background-size: 80%;
        }

        .content_body {
            background-color: #EEF4FE;
            width: 100%;
        }
    }
</style>
