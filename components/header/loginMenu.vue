<template>
  <div class="wrape">
    <div v-if="isLogin" class="hw--btn" @click="clickLogin()">
      <p>Log out</p>
    </div>
    <div v-else class="hw--btn" @click="clickLogin()">
      <p>Log in</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrape {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.hw--btn {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
  }
}
</style>
<script>
export default {
  data() {
    return {
      isLogin: false
    }
  },
  methods: {
    clickLogin() {
      this.isLogin = !this.isLogin
    }
  }
}
</script>
<style lang="scss">
p {
  width: 5rem;
}
</style>
