<template>
    <el-row class="m-main">
        <m-main-table v-if="bucketTableView"></m-main-table>
        <m-main-grid v-else></m-main-grid>
    </el-row>
</template>

<script>
  import appMixin from '@/mixins/app'
  import MMainTable from './m-main-table'
  import MMainGrid from './m-main-grid'

  export default {
    name: 'm-main',
    components: { MMainTable, MMainGrid },
    mixins: [appMixin]
  }
</script>

<style scoped lang="scss">
    .m-main {
        height: 100%;
        overflow: auto;
    }
</style>
