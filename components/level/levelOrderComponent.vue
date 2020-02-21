<template lang="pug">
    div.container-fluid
      div.row
        div.levelCard
          cardOrderComponent(v-for="(item, key, index) of items" :key="key")
            template(v-slot:icon)
              div(v-scroll:[item]="scrollHandle" )
                transition(name="fadeInFromUnderLeft")
                    i(:class="item.icon" v-if="item.isShowIcon")
            template(v-slot:title)
                div(v-scroll:[item]="handleScrollTitle")
                  transition(name="fadeInFromUnderRight")
                    div(v-if="item.isShowTitle") {{ item.title }}
            template(v-slot:price) {{ item.subTitle }}
</template>
<script>
import cardOrderComponent from '~/components/cards/cardOrderComponent.vue'
export default {
  components: {
    cardOrderComponent
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: null
    }
  },
  methods: {
    scrollHandle(evt, el, arg) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.items[arg.id].isShowIcon = true
      } else {
        this.items[arg.id].isShowIcon = false
      }
    },
    handleScrollTitle(evt, el, arg) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.items[arg.id].isShowTitle = true
      } else {
        this.items[arg.id].isShowTitle = false
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
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 976px) {
    padding: 0 5rem;
    flex-direction: row;
  }
}
i {
  font-size: 12rem;
  @media (min-width: 976px) {
    font-size: 7rem;
  }
}
</style>
