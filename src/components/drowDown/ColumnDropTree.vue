
<template>
    <div class="tree-view-item">
      <div v-for="node in parent" :key="node.id">
      <!-- // 当节点有孩子节点而且孩子节点的长度大于0 进行递归 -->
        <div v-if="node.child && node.child.length > 0">
          <Dropdown :transfer="false" @on-click="handleClick" placement="right-start">
            <DropdownItem :name="node.id">
              {{node.title}}
            </DropdownItem>
            <DropdownMenu slot="list">
              <ColumnDropTree  :parent="node.child"></ColumnDropTree>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div v-else>
        <!-- // 否则不递归 -->
          <DropdownItem :name="JSON.stringify(node)">
            {{node.title}}
          </DropdownItem>
        </div>
      </div>
    </div>
</template>
<script>
import ColumnDropTree from './ColumnDropTree'
export default {
  name: 'ColumnDropTree',
  components: {
    ColumnDropTree
  },
  data () {
    return {
      parentName: '',
      childValue: ''
    }
  },
  props: {
    parent: Array
  },
  computed: {},
  methods: {
      // 上抛事件 把选中的值上抛给父组件
    handleClick (name) {
      this.childValue = name
      this.$emit('childByValue', this.childValue)
    },
  },
  watch: {
    parent (val) {
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
 
<style>
 
</style>