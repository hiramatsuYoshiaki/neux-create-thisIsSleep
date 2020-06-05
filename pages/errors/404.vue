<template lang="pug">
    div.main-wrape
        nuxt-link( to="/")
            div.error-page-wrape
                h5 Page Not Found
                h6 The page you requested does not exist. Click here to continue shopping.

</template>
<script>
export default {
  layout: 'layout3Parts'
}
</script>
<style lang="scss" scoped>
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
}
.error-page-wrape {
  padding: 2rem 1rem;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: $black-bis;
}
</style>
