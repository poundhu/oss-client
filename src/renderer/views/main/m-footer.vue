<template>
    <div class="m-footer">
        <div class="footer-left">
            <span v-if="selected.length === 0">{{curBucketFiles.length}}项</span>
            <span v-else>已选择{{selected.length}}项</span>
        </div>
        <div class="footer-right">{{this.oss && this.oss.domain && this.oss.domain[0]}}</div>
    </div>
</template>

<script>
import appMixin from '@/mixins/app'

export default {
  name: 'm-footer',
  mixins: [appMixin]
}
</script>

<style scoped lang="scss">
    .m-footer {
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .footer-left {
            span {
                font-size: 13px;
                color: #909399;
            }
        }

        .footer-right {
            font-size: 13px;
            color: #909399;
        }
    }
</style>
