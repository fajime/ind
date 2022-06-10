<template>
  <main>
    <article class="dl-comp-storybook-components-header">
      <div class="layout-card-group">
        <dl-comp-storybook-component
          v-for="comp, index in items"
          :key="`dl-comp-storybook-card-header-${index}`"
          :comp="comp"
          :index="index"
        />
      </div>
      <!--
      <dl-comp-kit-demo-pagination :items="items" :pageSize="12" @changePage="onPageChange" />
      -->
    </article>
  </main>
</template>
<script>
import DlCompStorybookComponent from '../../atoms/dl-comp-storybook-component/';
// import DlCompKitDemoPagination from '@/catalog/components/atoms/dl-comp-kit-demo-pagination';

export default {
  components : {
    DlCompStorybookComponent
    // DlCompKitDemoPagination
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
<style src="./dl-comp-storybook-components.scss" lang="scss" />
