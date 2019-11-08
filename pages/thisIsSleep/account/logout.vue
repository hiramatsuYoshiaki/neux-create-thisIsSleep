<template lang="pug">
  div.main-wrape
    div.container-fluid
        div.row
            level2SlotsComponent
                template(v-slot:leve1)
                    div.slot-wrape.level1-wrape
                        div.title
                            h5 logout
                            nuxt-link(to="/")
                                div.h7 return to Home

                template(v-slot:leve2)
                    div.slot-wrape.level2-wrape
                        div.error-msg(v-if="isError")
                            div error message
                        form
                            buttun.submit-button(type="submit")
                                div
                                    div.h7 SING OUT

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
      isError: false
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
  padding: 2rem 2rem 1.2rem 2rem;
  @media (min-width: 768px) {
    padding: 20rem 1.2rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  a {
    color: black;
  }
}
// .level1-wrape {
//   //   border: 1px dotted;
// }
// .level2-wrape {
//   //   border: 1px dotted;
// }
// .email-enter {
//   //   border: 1px dotted red;
// }

.title {
  h5 {
    font-weight: 600;
  }
  .h7 {
    color: $grey;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
}
.error-msg {
  background-color: $grey-light;
  padding: 0.5rem;
  color: $black;
}

form {
  width: 100%;
}
.label {
  margin: 0.5rem 0;
  color: $grey;
  display: block;
  .h7 {
    font-weight: 300;
  }
}

.submit-button {
  display: block;
  color: $white;
  font-size: $size-6;
  font-weight: $weight-normal;
  background-color: $black-ter;
  border-radius: 2.6rem;
  max-width: 100%;
  width: 100%;
  height: 2.6rem;
  text-align: center;
  padding-top: 0.6rem;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  box-shadow: 1px $black;
  outline: 0;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    border-color: $grey-light;
    border-style: solid;
    border-color: $grey-darker;
    border-width: 1px;
    box-shadow: 1px $black;
  }
  margin: 2rem 0;
}
</style>
