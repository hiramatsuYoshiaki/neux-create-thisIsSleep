<template lang="pug">
  div.main-wrape
    div.container-fluid
        div.row
        level2SlotsComponent
            template(v-slot:leve1)
                div.slot-wrape.level1-wrape
                    div.title
                        h3 Login
                        nuxt-link(to="/")
                            h6 return to Home
            template(v-slot:leve2)
                div.slot-wrape.level2-wrape
                    div.reset-meg
                        h5 Reset your password
                        h6 We will send you an email to reset your password.
                    form
                        div
                            label.label email
                            input.input(type="text" placeholder="email")
                        div.password-enter(v-if="!isResetPass")
                            label.label passwordlabel
                            input.input(type="text" placeholder="password")
                        buttun.button.submit-button(type="submit")
                            div(v-if="!isResetPass")
                                h6 SING IN
                            div(v-else)
                                h6 submit

                    div.auth(v-if="!isResetPass")
                        div
                            nuxt-link( to="/account/registration")
                                h6 Create account
                        h6( @click="{isResetPass = true}") Forgot your password?
                    div.auth(v-if="isResetPass")
                        h6( @click="{isResetPass = false}") Cancel
</template>
<script>
import level2SlotsComponent from '~/components/layouts/levelSlots/level2SlotsComponent.vue'
export default {
  layout: 'layout3Parts',
  components: {
    level2SlotsComponent
  },
  data() {
    return {
      isResetPass: false
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
}
.slot-wrape {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  width: 50%;
}
.input {
  width: 100%;
  height: 3.2rem;
  @media (min-width: 967px) {
    width: 36rem;
  }
}
.button {
  width: 100%;
  height: 3.2rem;
  @media (min-width: 967px) {
    width: 36rem;
  }
}
// .mainLayout {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;

//   @media (min-width: 992px) {
//     flex-direction: row;
//   }
// }
// .level {
//   width: 100%;
//   overflow: hidden;
//   display: flex;
//   flex-wrap: nowrap;
//   justify-content: flex-start;
//   align-items: flex-start;
//   flex-direction: row;
//   border: 1px solid red;
// }
// .sol-content {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   flex-direction: column;
//   z-index: 10;
//   overflow: hidden;
// }
// .sol-content-wrape {
//   width: 100%;
//   margin: 0 2.5rem;
//   @media (min-width: 976px) {
//     margin: 0 15rem;
//     width: 30%;
//   }
// }
// .title {
//   h1 {
//     font-size: 5rem;
//     line-height: 1;
//   }
//   margin-bottom: 3rem;
// }
// .sub-title {
//   margin-bottom: 1rem;
// }
// .link-button {
//   display: flex;
//   justify-content: flex-start;
//   align-items: flex-start;
//   flex-direction: column;
//   @media (min-width: 976px) {
//     flex-direction: row;
//   }
// }
</style>
