<template>
  <div v-if="tab && tab.tab"
       :key="index"
       class="dl-ui-tabs__tab__box"
       @click="$emit('select')"
  >
    <div class="dl-ui-tabs__tab__box__bottom" />
    <div class="dl-ui-tabs__tab__box__content">
      <dl-ui-icon
        v-if="tab.tab.icon"
        :id="tab.tab.icon"
        :class="classSize.icon"
        class="dl-ui-icon--small dl-ui-tabs__tab__box__icon"
      />
      <div class="dl-ui-tabs__tab__box__text">
        {{ tab.tab.title }}
      </div>

      <button v-if="tab.closable"
              class="dl-ui-tabs__tool-button"
              @click="$emit('clear', {event: $event, tab: tab.tab, index: tab.index})"
      >
        <dl-ui-icon
          id="dl-ids-icon-close-no-circle-outlined"
          :class="classSize.clear"
          class="dl-ui-icon--small dl-ui-tabs__clear-icon"
        />
      </button>
    </div>
  </div>
</template>
<script>
import DlUiIcon from '../../../atoms/dl-ui-icon';

export default {
  name       : 'DlUiTabDefault',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits : ['select', 'clear'],
  props : {
    /**
   * override
   * @override
   */
    tab : {
      default : null,
      type    : Object
    },
    /**
   * override
   * @override
   */
    classSize : {
      default : () => {},
      type    : Object
    },
    /**
   * override
   * @override
   */
    index : {
      default : -1,
      type    : Number
    },
    /**
   * override
   * @override
   */
    activeIndex : {
      default : -1,
      type    : Number
    }
  }
};
</script>
