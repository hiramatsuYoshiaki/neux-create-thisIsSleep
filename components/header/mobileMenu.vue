<template>
  <div class="wrape">
    <div v-for="(item, key) of items" :key="key">
      <div class="mobileElemntWrape">
        <nuxt-link :to="item.to.name">
          {{ item.title }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
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
          to: { name: '/buy' }
        },
        {
          title: 'About',
          to: { name: '/about' }
        },
        {
          title: 'Contact',
          to: { name: '/contact' }
        }
      ]
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
