
<script>
/* eslint-disable vue/no-v-html */
export default {
  props : {
    content : {
      type    : String,
      default : ''
    }
  }
};
</script>
<template>
  <article class="dl-comp-storybook-html" v-html="content" />
</template>
<style src="./dl-comp-storybook-html.scss" lang="scss" />
