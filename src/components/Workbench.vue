<template>
  <div class="workbench">
    <header class="workbench-header">
      <div class="workbench-header__left">
        <div class="workbench-header__icon">
          <svg width="40" height="40" viewBox="0 0 20 20">
            <polygon points="18,12 18,7 13,7 13,9 5,9 5,6 7,6 7,1 2,1 2,6 4,6 4,17 5,17 13,17 13,19 18,19 18,14 13,14 13,16 5,16 5,10 13,10 
    13,12 "/>
          </svg>
        </div>
        <h1 class="workbench-header__title">{{title}}</h1>
    </header>
    <div class="workbench-main">
      <div>
        <tree-view :items="nodes" :config="treeViewConfig" />
      </div>
      <div v-if="DEBUG">
        <pre>{{JSON.stringify(selectedNode, null, 2)}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import TreeView from './TreeView';

// contentful config
const spaceId        = '21lu0993nsev';
const accessToken    = '8e4587bf58a7fbe34c5e44752d876f8b8e53676aecc0cfe144567d6defa49bf0';

export default {
  components: {
    TreeView,
  },
  data() {
    return {
      DEBUG: false,
      title: 'Content tree',
      nodes: [],
      toggledNodeIds: JSON.parse(localStorage.getItem('toggledNodeIds')) || [],
      selectedNodeId: JSON.parse(localStorage.getItem('selectedNodeId')),
      selectedNode: undefined,
      treeViewConfig: {
        getChildren: item => this.getChildNodes(item.sys.id),
        getToggled: item => this.toggledNodeIds.includes(item.sys.id),
        onToggled: item => {
          const index = this.toggledNodeIds.indexOf(item.sys.id);

          if (index >= 0) {
            this.toggledNodeIds.splice(index, 1);
          } else {
            this.toggledNodeIds.push(item.sys.id);
          }

          localStorage.setItem('toggledNodeIds', JSON.stringify(this.toggledNodeIds));
        },
        getSelected: item => this.selectedNodeId === item.sys.id,
        onSelected: item => {
          this.selectedNodeId = item.sys.id;
          this.selectedNode = item;

          localStorage.setItem('selectedNodeId', JSON.stringify(this.selectedNodeId));

          if (!this.DEBUG) {
            const url = `https://app.contentful.com/spaces/${item.sys.space.sys.id}/entries/${item.sys.id}`;
            window.open(url, 'contenful-entry');
          }
        },
      },
    };
  },
  methods: {
    getChildNodes(parentId = undefined) {
      const parentSelector = parentId ? `.sys.id=${parentId}` : '[exists]=false';

      return fetch(`https://cdn.contentful.com/spaces/${spaceId}/entries?content_type=node&fields.parent${parentSelector}&access_token=${accessToken}`)
        .then(res => res.json())
        .then(json => json.items)
        .then(items => {
          const selectedNode = items.find(item => item.sys.id === this.selectedNodeId);
          if (selectedNode) {
            this.selectedNode = selectedNode;
          }
          return items;
        });
    },
  },
  mounted() {
    this.getChildNodes().then(nodes => {
      this.nodes = nodes;
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
