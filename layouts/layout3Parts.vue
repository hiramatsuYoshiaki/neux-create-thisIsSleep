<template lang="pug">
div
    headerLayout(position="fixed",bgColor="#000")
    nuxt
    footerLayout
</template>
<script>
import headerLayout from '~/components/layouts/headers/header3Level.vue'
import footerLayout from '~/components/layouts/footers/footer1Level.vue'
export default {
  components: {
    headerLayout,
    footerLayout
  }
}
</script>
<style lang="scss">
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
