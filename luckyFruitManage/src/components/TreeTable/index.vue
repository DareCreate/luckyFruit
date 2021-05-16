<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.row[column.value]}}
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
      data: {
        type: [Array, Object],
        required: true,
      },
      columns: {
        type: Array,
        default: () => [],
      },
      evalFunc: {
        type: Function,
        // tslint:disable-next-line:no-empty
        default: null,
      },
      evalArgs: {
        type: Array,
        default: null,
      },
      expandAll: {
        type: Boolean,
        default: false,
      },
  },
  computed: {
    // 格式化数据源
    formatData() {
      let tmp;
      if (!Array.isArray(this.$props.data)) {
          tmp = [this.$props.data];
      } else {
          tmp = this.$props.data;
      }
      const func = this.$props.evalFunc || treeToArray;
      const beforeArg = [tmp, this.$props.evalArgs];
      const args = this.$props.evalArgs ? beforeArg.concat(this.$props.evalArgs) : beforeArg;
      return func.apply(null, args);
    },
  },
})
export default class TreeTable extends Vue {
  public formatData!: any[];
  showRow(row: any) {
    const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true);
    row.row._show = show;
    return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;';
  }
  // 切换下级是否展开
  toggleExpanded(trIndex: number) {
    const record = this.formatData[trIndex];
    record._expanded = !record._expanded;
  }
  getExpandedData() {
    return this.formatData.map((record) => {
      return record._expanded;
    });
  }
  setExpandedData(expandedData: any[]) {
    expandedData.forEach((expaned, index: number) => {
      if (!expaned) {
        return;
      }
      this.toggleExpanded(index);
    });
  }
  // 图标显示
  iconShow(index: number, record: any) {
    return (index === 0 && record.children && record.children.length > 0);
  }
}
function treeToArray(data: any, expandAll: any, parent = null, level: number | null = 0) {
  let tmp: any[] = [];
  Array.from(data).forEach((record: any) => {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll);
    }
    // tslint:disable-next-line:variable-name
    let _level = 1;
    if (level != null) {
      _level = level + 1;
    }
    Vue.set(record, '_level', _level);
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent);
    }
    tmp.push(record);
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level);
      tmp = tmp.concat(children);
    }
  });
  return tmp;
}
</script>

<style scoped lang="less">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: #2196F3;
    margin-left: 18px;
  }
</style>