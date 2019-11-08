<template lang="pug">
  div.main-wrape
    div.container-fluid
        div.row
            level2SlotsComponent
                template(v-slot:leve1)
                    div.slot-wrape.level1-wrape
                        div.title
                            h5 Contact
                            div.contact-text
                                div.text-block Whether it’s to chat about our products, service, or anything in between – we’d love to hear from you! Simply fill in the form below, click submit and we will get back to you as soon as we can.
                                div.text-block We do get lots of enquiries, so it may take us up to a day or slightly more to get back to you. Have you checked our
                                    span.faq-link
                                        nuxt-link(to="/thisIsSleep/faq/faq") Frequently Asked Questions
                                        | to see if we have the answer there?

                template(v-slot:leve2)
                    div.slot-wrape.level2-wrape
                        div.error-msg(v-if="isError")
                            div error message
                        form
                            div.first-name
                                label.label
                                    div.h7 name
                                input.input(type="text" placeholder="name")
                            div.email-enter
                                label.label
                                    div.h7 Email
                                input.input(type="email" placeholder="Email")
                            div.phone-number
                                label.label
                                    div.h7 phone number
                                input.input(type="text" placeholder="phone number")
                            div.message
                                label.label
                                    div.h7 message
                                textarea(name="textarea" rows="10" cols="50" placeholder="message")

                            buttun.submit-button(type="submit")
                                div
                                    div.h7 SEND
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
      checked: false,
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
    padding: 10rem 1.2rem;
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

form {
  width: 100%;
}
.error-msg {
  background-color: $grey-light;
  padding: 0.5rem;
  color: $black;
}
.label {
  margin: 0.5rem 0;
  color: $grey;
  display: block;
  .h7 {
    font-weight: 300;
  }
}
textarea {
  display: block;
  color: $black;
  font-size: $size-6;
  font-weight: $weight-normal;
  background-color: $white-ter;
  border-radius: 3.2rem;
  max-width: 100%;
  width: 100%;
  height: 20rem;
  padding-left: 0.5rem;
  padding-top: 2rem;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  box-shadow: 1px $black;
  outline: 0;
  &:hover,
  &:active,
  &:focus {
    border-color: $grey-light;
    border-style: solid;
    border-color: $grey-darker;
    border-width: 1px;
    box-shadow: 1px $black;
  }
}
.input {
  display: block;
  color: $black;
  font-size: $size-6;
  font-weight: $weight-normal;
  background-color: $white-ter;
  border-radius: 3.2rem;
  max-width: 100%;
  width: 100%;
  height: 2.6rem;
  padding-left: 0.5rem;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  box-shadow: 1px $black;
  outline: 0;
  &:hover,
  &:active,
  &:focus {
    border-color: $grey-light;
    border-style: solid;
    border-color: $grey-darker;
    border-width: 1px;
    box-shadow: 1px $black;
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
.subscription {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .label-checkbox {
    margin-left: 1rem;
    margin-top: -0.3rem;
  }
}
.contact-text {
  line-height: 1.8rem;
  color: $grey-darker;
  font-weight: 300;
  padding-right: 4rem;
  word-break: break-word;
}
.text-block {
  margin-bottom: 1rem;
}
.faq-link {
  a {
    text-decoration: underline;
    margin-left: 0.4rem;
  }
}
</style>
