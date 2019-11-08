<template>
  <div class="wrape">
    <div v-for="(item, key) of items" :key="key">
      <div class="mobileElemntWrape" @click="closeMobileMenu()">
        <nuxt-link :to="item.to.name">
          {{ item.title }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          to: { name: '/' }
        },
        {
          title: 'Buy',
          to: { name: '/thisIsSleep/buy/buy' }
        },
        // {
        //   title: 'About',
        //   to: { name: '/about' }
        // },
        {
          title: 'FAQ',
          to: { name: '/thisIsSleep/faq/faq' }
        },
        {
          title: 'Contact',
          to: { name: '/thisIsSleep/contact/contact' }
        }
      ]
    }
  },
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu'])
    // ...mapState(store/directory,state)
  },
  methods: {
    ...mapMutations({ close: 'headerBar/closeMobileMenu' }),
    // ...mapMutation({ name: store(directory)/mutations})
    closeMobileMenu() {
      // this.$store.commit('headerBar/setOpenMobileMenu')
      this.close()
    }
  }
}
</script>

<style scoped lang="scss">
.wrape {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mobileElemntWrape {
  margin: 1rem 0;
}
a {
  color: $body-text;
  text-decoration: none;
}
</style>
