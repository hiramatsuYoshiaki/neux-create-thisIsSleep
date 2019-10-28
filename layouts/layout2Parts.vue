<template lang="pug">
div
    headerLayout(position="fixed",bgColor="transparent")
    nuxt
</template>
<script>
import headerLayout from '~/components/layouts/headers/header3Level.vue'
export default {
  components: {
    headerLayout
  }
}
</script>
<style lang="scss">
// .contents {
//   position: relative;
// }
// .header {
//   position: absolute;
//   top: 0;
//   left: 0;
//   border: 1ox solid red;
//   z-index: 9999;
// }

// .layoutContainer {
//   position: relative;
//   margin-left: auto;
//   margin-right: auto;
//   //   margin-left: 16px;
//   //   margin-right: 16px;
//   padding-right: 16px;
//   padding-left: 16px;
//   border: 1px dotted red;
//   background-color: rgba(0, 0, 0, 0.2);
// }
// html {
//   border: 3px dotted green;
// }
// body {
//   width: 100vw;
//   margin-right: 0 -16px;
//   border: 3px dotted blue;
//   background-color: blueviolet;
//   overflow: hidden;
// }
</style>
