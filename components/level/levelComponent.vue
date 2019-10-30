<template lang="pug">
  div.aaa
    div.container-fluid
      div.row
        div.section-header(v-scroll="handleScroll")
          transition(name="fadeInFromUnder")
            h5(v-if="isShow") {{title}}
    div.container-fluid
      div.row
        div.col-12.col-sm-6.col-lg-3(
          v-for="(item, key) of items" :key="key"
        )
          cardComponent
            template(v-slot:image)
              <img :src="item.img" :alt="item.title" class="img" />
            template(v-slot:title) {{ item.title }}
            template(v-slot:price) {{ item.price }}
</template>
<script>
import cardComponent from '~/components/cards/cardComponent.vue'
export default {
  components: {
    cardComponent
  },
  props: {
    items: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: 'Section Title'
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    handleScroll(evt, el) {
      const top = el.getBoundingClientRect().top
      // console.log('top: ' + top)
      // console.log(window.scrollY)
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        // el.setAttribute(
        //   'style',
        //   'opacity: 1; transform: translate3d(0, -10px, 0) '
        // )
        this.isShow = true
      } else {
        // el.removeAttribute(
        //   'style',
        //   'opacity: 0; transform: translate3d(0, 0, 0)'
        // )
        this.isShow = false
      }
    }
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
  margin-top: -3rem;
  overflow: hidden;
  h5 {
    font-weight: 600;
  }
  @media (min-width: 976px) {
    padding: 0 5rem;
    height: 10rem;
  }
}
.img {
  width: 100%;
  height: auto;
}
</style>
