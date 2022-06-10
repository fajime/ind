<template>
  <div class="dl-ui-tree-node"
       :class="{'dl-ui-tree-node--active':(!hasChildren && isActive)}"
  >
    <div class="dl-ui-tree-node__label-content" @click="onItemClicked">
      <div v-for="n in level"
           :key="n"
           class="dl-ui-tree-node__tab"
      />
      <dl-ui-icon
        v-if="hasChildren"
        id="dl-ids-icon-arrows-down-single-no_circle-outlined"
        class="dl-ui-rowitemTree__trigger-icon"
        :class="{'dl-ui-rowitemTree__trigger-icon--open':config.opened}"
      />
      <dl-ui-icon v-if="config.icon" :id="config.icon" />
      {{ config.label }}
    </div>
    <ul v-if="hasChildren"
        class="dl-ui-tree-node__children-content"
        :class="{'dl-ui-tree-node__children-content--open':config.opened}"
    >
      <li v-for="(item, ind) in config.children" :key="ind">
        <DlUiTreeNode :config="item"
                      :level="level+1"
                      :index="ind"
                      :isActive="childActiveIndex===ind"
                      :nodeActiveConfig="getChildrenNodeActiveConfig()"
                      @itemClicked="onChildClicked"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import DlUiIcon from '../../atoms/dl-ui-icon';

export default {
  name       : 'DlUiTreeNode',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits : ['itemClicked'],
  props : {
    /**
     * Init value.
     */
    config : {
      type    : Object,
      default : undefined,
      desc    : 'Objeto de configuración'
    },
    /** level of config */
    level : {
      type    : Number,
      default : 0,
      desc    : 'Nivel de anidamiento'
    },
    /** index of element */
    index : {
      type    : Number,
      default : 0,
      desc    : 'Indice del elemento'
    },
    /** Indicates if this node is active because one leaf o itself is active */
    isActive : {
      type    : Boolean,
      default : false,
      desc    : 'Indica si este nodo está activo porque una hoja o él mismo está activo'
    },
    /** child leaf active config */
    nodeActiveConfig : {
      type    : Array,
      default : () => [],
      desc    : 'Configuración de elementos hijos activos'
    }
  },
  computed :
  {
    /**
     * detects if this tree has children, so is not a leaf node
     * @returns {Boolean} True if has children
     */
    hasChildren() {
      return this.config.children && this.config.children.length > 0;
    },
    /**
     * return first index of child element active
     * @returns {Number} Index of child element active
     */
    childActiveIndex() {
      let value = -1;
      if (this.nodeActiveConfig.length > 0) {
        value = this.nodeActiveConfig[0];
      }
      return value;
    }
  },
  methods : {
    /** click over item event listener
     * @returns {Array} Array of indexes
     */
    getChildrenNodeActiveConfig() {
      let value = [];
      if (this.nodeActiveConfig.length > 0) {
        value = [...this.nodeActiveConfig];
        value.shift();
      }
      return value;
    },
    /** click over item event listener
    */
    onItemClicked() {
      if (this.config.fn) {
        this.config.fn(...(this.config.fnParams ? this.config.fnParams : []));
      }
      if (this.config.route) {
        this.$router.push({
          name   : this.config.route,
          params : this.config.routeParams ? this.config.routeParams : {}
        });
      }
      if (this.hasChildren) {
        this.toggleChildrenContent();
      }
      else {
        const eventObj = {
          config : this.config,
          index  : [this.index]
        };
        this.$emit('itemClicked', eventObj);
      }
    },
    /** click over child item event listener
    * @param {Object} itemConfig Item config clicked
    */
    onChildClicked(itemConfig) {
      itemConfig.index.unshift(this.index);
      const eventObj = {
        config : itemConfig.config,
        index  : [...itemConfig.index]
      };
      this.$emit('itemClicked', eventObj);
    },
    /** toggle children content */
    toggleChildrenContent() {
      if (this.config.opened === undefined) {
        // eslint-disable-next-line vue/no-mutating-props
        this.config.opened = false;
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.config.opened = !this.config.opened;
    }
  }
};
</script>
