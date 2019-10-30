<template lang="pug">
    div.card-wrape
        div.card-image
            slot(name="image")
        div.card-content
            div.header
                slot(name="title")
            div.content
                slot(name="price")
</template>
<style lang="scss" scoped>
.card-wrape {
  width: 100%;
  margin: 0 0 1rem 0;
  padding: 0 2rem;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 976px) {
    padding: 0 2rem;
  }
  @media (min-width: 992px) {
    padding: 0 2rem;
  }
}
.card-image {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.card-content {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
</style>
