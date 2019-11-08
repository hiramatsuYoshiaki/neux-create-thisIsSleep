<template>
  <div class="wrape">
    <ul>
      <li v-for="(item, key) of items" :key="key">
        <nuxt-link :to="item.to.name">
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
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
  }
}
</script>
<style scoped lang="scss">
.wrape {
  width: 100%;
  height: 100%;
}
li {
  display: inline;
  padding: 0 2rem;
}
a {
  color: $body-text;
  text-decoration: none;
}
</style>
