<template>
  <div id="app">
    <div class="app-container">
      <header class="app-top-bar">
        <a href="#" class="app-top-bar__logo app-top-bar__child">
          <div class="app-top-bar__logo-element"></div>
          <div class="app-top-bar__logo-text">Home</div>
        </a>
      </header>
      <router-view class="app-container__content"></router-view>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
// contentful overrides
.app-top-bar {
  flex-shrink: 0;
}
.workbench-main {
  display: flex;
  height: auto;
  flex-grow: 1;
  overflow: hidden;

  > * {
    flex-grow: 1;
    padding: 1.5rem 1rem;
    overflow-y: auto;
  }
}

// custom treeview contentful styling
.tree-view-item {
  padding: 0;
  margin: 0;

  > .tree-view-item-header {
    .tree-view-item-toggle {
      svg {
        fill: #dedede;
      }
    }
    .tree-view-item-value {
      color: #1683d0;
      padding: 4px 8px;
      border: solid 1px transparent;
      border-radius: 3px;

      &:hover {
        color: #0c2c52;
        text-decoration: underline;
      }
    }
  }

  &-isSelected {
    > .tree-view-item-header {
      .tree-view-item-value {
        background-color: #f5f5f5;
        color: #000;
        font-weight: bold;
        text-decoration: none !important;
        border-color: #dedede;
      }
    }
  }
}
</style>
