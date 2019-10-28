<template>
  <div class="wrape">
    <ul>
      <!-- <nuxt-link to="/">
          Home
        </nuxt-link>
        <nuxt-link to="/">
          work
        </nuxt-link>
        <nuxt-link to="/">
          about
        </nuxt-link>
        <nuxt-link to="/">
          contact
      </nuxt-link>-->
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
          title: 'Works',
          to: { name: '/works' }
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
