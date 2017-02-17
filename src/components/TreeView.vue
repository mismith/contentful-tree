<template>
  <ul class="tree-view">
    <tree-view-item v-for="item in items" :item="item" :toggled="config.getToggled" :selected="config.getSelected" :config="config" />
  </ul>
</template>

<script>
import TreeViewItem from './TreeViewItem';

export default {
  components: {
    TreeViewItem,
  },
  props: {
    items:  {
      type: Array,
    },
    config: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-view {
  display: flex;
  flex-direction: column;
}
</style>
