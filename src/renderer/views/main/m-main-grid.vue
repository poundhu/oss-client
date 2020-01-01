<template>
    <el-row class="m-main-grid" v-loading="bucketLoading">
        <div class="grid-item"
             v-for="(item, index) in currentBucket.children"
             :title="item.name"
             :class="[ selected.findIndex(i=>i.uuid === item.uuid) >= 0 ? 'selected' : '' ]"
             @dblclick="dblClickItem(item)"
             @click="clickItem(item)"
             @contextmenu="contextMenu(item)"
             :key="index" :data-hash="item.uuid">
            <icon class="item-icon" :postfix="item.ext"
                  :meta="item.meta"
                  :showImg="oss && oss.domain && oss.domain.length > 0"
                  :domain="oss && oss.domain && oss.domain[0]"
                  :isFolder="item.isFolder"/>
            <span>{{item.name}}</span>
        </div>
    </el-row>
</template>

<script>
  import Selection from '@simonwep/selection-js'

  import appMixin from '@/mixins/app'
  import MMainTable from './m-main-table'
  import Icon from '@/components/icon'

  export default {
    name: 'm-main',
    components: {MMainTable, Icon},
    mixins: [appMixin],
    methods: {
      // 选区
      onSelect ({target, originalEvent, selectedElements}) {
        const selected = target.classList.contains('selected')
        if (!originalEvent.ctrlKey && !originalEvent.metaKey) {
          for (const el of selectedElements) {
            this.removeSelectedItem(el.dataset.hash)
          }
          this.clearAllSelected()
        }
        if (!selected) {
          this.addSelectedItem(target.dataset.hash)
        } else {
          this.removeSelectedItem(target.dataset.hash)
        }
      },
      onStart ({selectedElements, originalEvent}) {
        if (!originalEvent.ctrlKey && !originalEvent.metaKey) {
          for (const el of selectedElements) {
            this.removeSelectedItem(el.dataset.hash)
          }
          this.clearAllSelected()
        }
      },
      onMove ({selectedElements, changedElements: {removed}}) {
        for (const el of selectedElements) {
          this.addSelectedItem(el.dataset.hash)
        }
        for (const el of removed) {
          this.removeSelectedItem(el.dataset.hash)
        }
      }
    },
    mounted () {
      this.selection = Selection.create({
        class: 'selection',
        selectables: ['.m-main-grid > div'],
        boundaries: ['.m-main-grid'],
        onSelect: this.onSelect,
        onStart: this.onStart,
        onMove: this.onMove
      })
      this.clearAllSelected()
    }
  }
</script>

<style scoped lang="scss">
    .m-main-grid {
        overflow: auto;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        padding: 5px 15px;

        .grid-item {
            width: 125px;
            height: 125px;
            margin: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            &.selected {
                box-sizing: border-box;
                background: #cce8ff;
                border: 1px solid #99d1ff;
            }

            .item-icon {
                width: 70px;
                height: 70px;
                margin: 0 auto;
            }

            span {
                cursor: default;
                padding-top: 5px;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 1.5;
            }

            &:hover {
                background: #cce8ff;
            }
        }
    }
</style>
