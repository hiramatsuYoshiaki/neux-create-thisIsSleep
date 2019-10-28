<template lang="pug">
    div.container-fluid
      div.row
        //- div.section-header
        //-     h5 Order
        div.levelCard
          cardOrderComponent(v-for="(item, key) of items" :key="key")
            //- template(v-slot:image)
            //-   <img :src="item.img" :alt="item.title" class="img" />
            template(v-slot:icon)
               <i :class="item.icon" />
            template(v-slot:title) {{ item.title }}
            template(v-slot:price) {{ item.subTitle }}

</template>
<script>
import cardOrderComponent from '~/components/cards/cardOrderComponent.vue'
export default {
  components: {
    cardOrderComponent
  },
  props: {
    items: Array
  }
}
</script>
<style lang="scss" scoped>
// .container,
// .container-fluid {
//   width: 100%;
//   margin-right: auto;
//   margin-left: auto;
//   padding-left: 15px;
//   padding-right: 15px;
// }
// .row {
//   margin-left: -15px;
//   margin-right: -15px;
//   display: flex;
//   justify-content: flex-start;
//   flex-direction: row;
//   flex-wrap: wrap;
// }
.section-header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h5 {
    font-weight: 600;
  }
  @media (min-width: 976px) {
    padding: 0 5rem;
    height: 10rem;
  }
}
.levelCard {
  width: 100%;
  padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 976px) {
    padding: 0 5rem;
    flex-direction: row;
  }
}
.img {
  width: 100%;
  height: auto;
}
</style>
