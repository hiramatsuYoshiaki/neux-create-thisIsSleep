<template lang="pug">
    div.main-wrape
        div.container-fluid
            div.row
                div.solution-content solution content
                div.buy-content buy content
                div.total-content solution content

</template>
<script>
import { mapState } from 'vuex'
import { SLEEP_GET_SOLUTION } from '~/store/actionTypes'
export default {
  layout: 'layout2Parts',
  data() {
    return {}
  },
  computed: {
    ...mapState(['user']),
    ...mapState('solutions', ['solutions'])
  },
  async mounted() {
    if (this.user) {
      await this.$store.dispatch(SLEEP_GET_SOLUTION, this.user.uid)
    } else {
      this.$router.push('/thisIsSleep/account/logout')
    }
  },

  methods: {}
}
</script>
<style lang="scss" scoped>
* {
  border: 1px dotted grey;
}
/* .main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
} */
</style>
