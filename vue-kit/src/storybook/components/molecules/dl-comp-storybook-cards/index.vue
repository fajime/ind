<template>
  <article class="dl-comp-storybook-landing__section">
    <div class="dl-comp-storybook-landing__section__cards">
      <div v-if="title" class="dl-comp-storybook-landing__section__title--primary">
        {{ title }}
      </div>

      <div class="layout-card-group">
        <dl-storybook-card
          v-for="(card, index) in items"
          :key="`dl-comp-storybook-card-header-${index}`"
          :item="card"
        />
      </div>
    </div>
  </article>
</template>
<script>
import DlStorybookCard from '../../atoms/dl-comp-storybook-card/';

export default {
  components : {
    DlStorybookCard
  },
  props : {
    /**
    * Override
    * @override
    */
    items : {
      type    : Array,
      default : null
    },
    /**
    * Override
    * @override
    */
    title : {
      type    : String,
      default : null
    }
  }
};
</script>
