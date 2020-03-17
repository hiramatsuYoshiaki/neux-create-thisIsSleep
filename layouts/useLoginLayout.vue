<template>
  <div>
    <loginLayout>
      <template v-slot:mobileWindow>
        <div class="mobileMenu-wrape">
          <div class="brand">
            <div>
              <slot name="brand" />
            </div>
          </div>
          <div class="mobile-menu">
            <slot name="mobileMenu" />
          </div>
          <div class="login-menu">
            <slot name="loginMenu" />
          </div>
          <div @click="closeMobileMenu()" class="btn-close hw--btn">
            <i class="material-icons">close</i>
          </div>
        </div>
      </template>
      <template v-slot:headerBar>
        <div class="header-wrape">
          <div class="burger">
            <slot name="burger" />
          </div>
          <div class="brand">
            <div>
              <slot name="brand" />
            </div>
          </div>
          <div class="gloval-menu-header">
            <slot name="glovalMenu" />
          </div>
          <div class="login-menu">
            <slot name="loginMenu" />
          </div>
        </div>
      </template>

      <div class="main-content">
        <slot />
      </div>
      <template v-slot:footerBar>
        <div class="footer-wrape">
          <div class="footer-items gloval-menu-footer">
            <slot name="mobileMenu" />
          </div>
          <div class="footer-items brand-footer">
            <div>
              <slot name="brand" />
            </div>
          </div>
          <div class="footer-items sns-footer">
            <slot name="sns" />
          </div>
          <div class="footer-items copylight-footer">
            <slot name="copylight" />
          </div>
        </div>
      </template>
    </loginLayout>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import loginLayout from '~/layouts/loginLayout.vue'
export default {
  components: {
    loginLayout
  },
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu'])
  },
  methods: {
    ...mapMutations({ close: 'headerBar/setOpenMobileMenu' }),
    closeMobileMenu() {
      this.close()
    }
  }
}
</script>
<style scoped lang="scss">
.header-wrape {
  position: relative;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}
.mobileMenu-wrape {
  position: relative;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.footer-wrape {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: #3d3d3d;
  padding: 3.2rem;
}
.footer-items {
  margin: 0.8rem 0 1.2rem;
}

.burger {
  display: block;
  @media (min-width: 1024px) {
    display: none;
  }
}
.gloval-menu-header {
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
}
</style>
