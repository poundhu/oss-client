<template>
    <div class="layout-transfer">
        <t-sider class="transfer-sider"></t-sider>
        <div class="transfer-main">
            <t-down v-if="tActive === 0"></t-down>
            <t-upload v-if="tActive === 1"></t-upload>
            <t-done v-if="tActive === 2"></t-done>
        </div>
    </div>
</template>

<script>
  import transferMixin from '@/mixins/transfer'
  import TSider from './t-sider'
  import TDone from './t-done'
  import TDown from './t-download'
  import TUpload from './t-upload'

  export default {
    name: 'index',
    components: { TSider, TDone, TDown, TUpload },
    mixins: [transferMixin]
  }
</script>

<style scoped lang="scss">
    .layout-transfer {
        display: flex;

        .transfer-sider {
            width: 165px;
            border-right: 1px solid #dcdfe6;
        }

        .transfer-main {
            flex: 1;
        }
    }
</style>
