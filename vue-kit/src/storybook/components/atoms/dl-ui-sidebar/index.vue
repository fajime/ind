<template>
  <div class="dl-ui-sidebar">
    <slot />
  </div>
</template>
<style lang="scss">
.dl-ui-sidebar {
  position: fixed;
  display: flex;
  transition: transform 0.3s, -webkit-transform 0.3s;
}

.dl-ui-sidebar--left {
  top: 0;
  left: 0;
  width: 20rem;
  height: 100%;
}

</style>
