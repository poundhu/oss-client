<template>
    <div class="layout-body">
        <m-sider class="body-sider"></m-sider>
        <div class="body-main">
            <m-toolbar class="body-main-toolbar"></m-toolbar>
            <m-header class="body-main-header"></m-header>
            <m-main class="body-main__wrapper"></m-main>
            <m-footer class="body-main-footer"></m-footer>
        </div>
    </div>
</template>

<script>
  import MSider from './m-sider'
  import MToolbar from './m-toolbar'
  import MHeader from './m-header'
  import MMain from './m-main'
  import MFooter from './m-footer'

  export default {
    name: 'index',
    components: { MSider, MToolbar, MHeader, MFooter, MMain }
  }
</script>

<style scoped lang="scss">
    .layout-body {
        display: flex;

        .body-sider {
            width: 165px;
            border-right: 1px solid #dcdfe6;
        }

        .body-main {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;

            .body-main-toolbar {
                height: 40px;
                background: #f9fafb;
                border-bottom: 1px solid #ebeef5;
            }

            .body-main-header {
                height: 40px;
                background: #fff;
                border-bottom: 1px solid #ebeef5;
            }

            .body-main__wrapper {
                flex: 1;
            }

            .body-main-footer {
                border-top: 1px solid #ebeef5;
                height: 35px;
            }
        }
    }
</style>
