<template>
  <div class="wrape">
    <div
      id="toggle"
      :class="{ on: isOpenMobileMenu }"
      @click="openMobileMenu()"
    >
      <div class="one" />
      <div class="two" />
      <div class="three" />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  // data() {
  //   return {
  //     isOpenMobileMenu: false
  //   }
  // },
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu'])
    // ...mapState(store/directory,state)
  },
  methods: {
    ...mapMutations({ open: 'headerBar/setOpenMobileMenu' }),
    // ...mapMutation({ name: store(directory)/mutations})
    openMobileMenu() {
      // this.isOpenMobileMenu = !this.isOpenMobileMenu
      // this.$store.commit('headerBar/setOpenMobileMenu')
      this.open()
    }
  }
}
</script>
<style scoped lang="scss">
.wrape {
  width: 100%;
  height: 100%;
}
//mobile menu
#toggle {
  width: 28px;
  height: 30px;
  margin: 10px auto;
  cursor: pointer;
}
#toggle div {
  width: 100%;
  height: 5px;
  background: white;
  margin: 4px auto;
  transition: all 0.3s;
  backface-visibility: hidden;
}
//click move element tggtl class on
#toggle.on .one {
  transform: rotate(45deg) translate(5px, 5px);
}

#toggle.on .two {
  opacity: 0;
}

#toggle.on .three {
  transform: rotate(-45deg) translate(7px, -8px);
}
</style>
