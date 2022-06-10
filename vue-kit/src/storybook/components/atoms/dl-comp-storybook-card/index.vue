<template>
  <dl-comp-storybook-card
    v-if="item"
  >
    <div v-if="item.icon" class="dl-comp-storybook-landing-header__header">
      <dl-ui-icon
        :id="item.icon.type"
        :class="[
          'dl-comp-storybook-landing__section-icon',
          `dl-comp-storybook-landing__section-icon--${item.icon.align}`,
          `dl-comp-storybook-landing__section-icon--${item.icon.size}`
        ]"
      />
      <h6>{{ item.header }}</h6>
    </div>
    <div class="dl-comp-storybook-landing-header__body">
      <span class="body-medium-regular">{{ item.body }}</span>
    </div>
    <div v-if="item.action" class="dl-comp-storybook-landing-header__action">
      <h6>{{ item.action.text }}</h6>
      <router-link v-if="item.action.to" :to="item.action.to" />
      <a v-else :target="item.action.target ? item.action.target : '_blank'" :href="item.action.link || '#'" />
    </div>
  </dl-comp-storybook-card>
</template>
<script>

import DlCompStorybookCard from '@/storybook/components/molecules/dl-comp-storybook-card';
import DlUiIcon from '@/components/atoms/dl-ui-icon';

export default {
  components : {
    DlCompStorybookCard, DlUiIcon
  },
  props : {
    /**
   * Override
   * @override
   */
    item : {
      type    : Object,
      default : null
    }
  }
};
</script>
