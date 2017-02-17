<template>
  <li class="tree-view-item" :class="{'tree-view-item-hasChildren': hasChildren, 'tree-view-item-isToggled': isToggled, 'tree-view-item-isSelected': isSelected}">
    <header class="tree-view-item-header">
      <div @click="config.onToggled(item)" class="tree-view-item-toggle">
        <svg width="10" height="10" viewBox="0 0 16 16">
          <polygon points="0,0 16,8 0,16" />
        </svg>
      </div>
      <span @click="config.onSelected(item)" class="tree-view-item-value">{{item.fields.name}}</span>
    </header>
    <tree-view v-if="isToggled" :items="children" :config="config" />
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
    },

    toggled: {
      type: [Boolean, Function],
      default: false,
    },
    selected: {
      type: [Boolean, Function],
      default: false,
    },
  },
  data() {
    return {
      children: [],
    };
  },
  computed: {
    hasChildren() {
      return this.children && this.children.length;
    },
    isToggled() {
      if (this.toggled instanceof Function) return this.toggled(this.item);
      return this.toggled;
    },
    isSelected() {
      if (this.selected instanceof Function) return this.selected(this.item);
      return this.selected;
    },
  },
  beforeCreate() {
    // lazy-load this to avoid recursive module loading loop
    this.$options.components.TreeView = require('./TreeView'); // eslint-disable-line
  },
  async mounted() {
    if (this.config && this.config.getChildren && this.config.getChildren instanceof Function) {
      this.children = await this.config.getChildren(this.item);
    }
  },
};
</script>

<style lang="scss" scoped>
$indent: 20px;
.tree-view-item {
  display: flex;
  flex-direction: column;

  > .tree-view-item-header {
    display: flex;
    user-select: none;

    .tree-view-item-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $indent;

      svg {
        transform: rotate(0);
        transition: all 30ms linear;
        opacity: 0;
      }
    }
    .tree-view-item-value {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  &-hasChildren {
    > .tree-view-item-header {
      .tree-view-item-toggle {
        cursor: pointer;

        svg {
          opacity: 1;
        }
      }
    }
  }
  &-isToggled {
    > .tree-view-item-header {
      .tree-view-item-toggle svg {
        transform: rotate(90deg);
      }
    }
  }
  &-isSelected {
    > .tree-view-item-header {
      .tree-view-item-value {
        font-weight: bold;
      }
    }
  }

  > .tree-view {
    padding-left: $indent;
  }
}
</style>
