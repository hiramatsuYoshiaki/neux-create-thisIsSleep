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
                    div.slot-wrape
                        //- form(@submit.prevent="sendMail" novalidate)
                        form(@submit.prevent="mailCheck" novalidate)
                            div(v-if="loginErrors.length")
                              p.error-title 入力項目を確認してください。
                                ul
                                  li(v-for="(loginError, indexError) in loginErrors" :key="indexError")
                                    p.error-msg {{ loginError}}
                            div.first-name
                                label.label
                                    div.h7 name
                                input.input(v-model="firstName" type="text" placeholder="name" required :style="{ background: errorBg.fNameBg }")
                            div.email-enter
                                label.label
                                    div.h7 Email
                                input.input(v-model="email" type="email" placeholder="Email" required :style="{ background: errorBg.emailBg }")
                            div.phone-number
                                label.label
                                    div.h7 phone number
                                input.input(v-model="phone" type="text" placeholder="phone" required :style="{ background: errorBg.phoneBg }")
                            div.message
                                label.label
                                    div.h7 message
                                textarea(v-model="mailMessage" name="textarea" rows="10" cols="50" placeholder="message" required :style="{ background: errorBg.mailMessageBg }")

                            button.submit-button(type="submit")
                                div
                                    div.h7 SEND
                        div.messege
                            ul
                                li(v-for="(msg, index) in message" :key="index")
                                    p.guid-msg {{ msg }}
</template>
<script>
import { mapState } from 'vuex'
import { SENDGRID } from '~/store/actionTypes'
import level2SlotsComponent from '~/components/layouts/levelSlots/level2SlotsComponent.vue'
export default {
  layout: 'layout3Parts',
  components: {
    level2SlotsComponent
  },
  data() {
    return {
      checked: false,

      firstName: null,
      email: null,
      phone: null,
      mailMessage: null
    }
  },
  computed: {
    ...mapState('account', ['loginErrors']),
    ...mapState('account', ['errorBg']),
    ...mapState(['message'])
  },
  mounted() {
    this.$store.commit('account/clearLoginError')
    this.$store.commit('account/clearErrorBg', '#e3f2fd')
    this.$store.commit('clearMessage')
  },
  methods: {
    validEmail: (email) => {
      // incorrect code for this rule Disallow unnecessary escape usage (no-useless-escape) 28col-->\ del 53col-->\ del
      // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // correct code for this rule
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return re.test(email)
    },
    validPhonel: (phone) => {
      const reg = /^\d{11}$/
      return reg.test(phone)
    },
    sendMail() {
      this.$store.commit('clearMessage')
      // alert('sendMail')
      const msg = {
        to: 'hiramatsu3300@gmail.com',
        from: this.email,
        subject: 'CONTACT',
        text: this.mailMessage,
        name: this.firstName,
        phone: this.phone
      }
      this.$store.dispatch(SENDGRID, msg)
    },
    mailCheck(e) {
      // alert('mailCheck')
      // alert('firstName--> ' + this.firstName)
      // alert('email--> ' + this.email)
      // alert('phone--> ' + this.phone)
      // alert('mailMessage--> ' + this.mailMessage)
      this.$store.commit('account/clearLoginError')
      this.$store.commit('account/clearErrorBg', '#e3f2fd')
      this.$store.commit('clearMessage')
      if (!this.firstName) {
        this.$store.commit('account/setLoginError', '氏名は必須です。')
        this.$store.commit('account/setFNameBg', '#f8bbd0')
      } else if (this.firstName.length > 16) {
        this.$store.commit('account/setLoginError', '氏名は１６文字以下です。')
        this.$store.commit('account/setFNameBg', '#f8bbd0')
      }
      if (!this.email) {
        this.$store.commit('account/setLoginError', 'メールは必須です。')
        this.$store.commit('account/setEmailBg', '#f8bbd0')
      } else if (!this.validEmail(this.email)) {
        this.$store.commit('account/setLoginError', '無効なメール形式です。')
        this.$store.commit('account/setEmailBg', '#f8bbd0')
      }
      if (!this.phone) {
        this.$store.commit('account/setLoginError', '電話番号は必須です。')
        this.$store.commit('account/setPhoneBg', '#f8bbd0')
      } else if (!this.validPhonel(this.phone)) {
        this.$store.commit(
          'account/setLoginError',
          '電話番号は先頭が「0」で半角数字です'
        )
        this.$store.commit('account/setPhoneBg', '#f8bbd0')
      } else if (this.phone.length > 11) {
        this.$store.commit(
          'account/setLoginError',
          '電話番号は１１文字以下です。'
        )
        this.$store.commit('account/setPhoneBg', '#f8bbd0')
      }
      if (!this.mailMessage) {
        this.$store.commit('account/setLoginError', 'メッセージは必須です。')
        this.$store.commit('account/setmailMessageBg', '#f8bbd0')
      }

      if (!this.loginErrors.length) {
        this.sendMail()
      }
      e.preventDefault()
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

.error-title {
  color: $red;
}
.error-msg {
  background-color: $grey-light;
  padding: 0.5rem;
  color: $black;
}
.reset-meg {
  margin-bottom: 2rem;
  h6 {
    margin-bottom: 1rem;
  }
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
