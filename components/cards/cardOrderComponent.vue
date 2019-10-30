<template lang="pug">
    div.card-wrape
        //- div.card-image
        //-     slot(name="image")
        div.card-icon
            slot(name="icon")
        div.card-content
            div.header
                slot(name="title")
            div.content
                slot(name="price")
</template>
<style lang="scss" scoped>
.card-wrape {
  width: 100%;
  margin: 0 0 2rem 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 976px) {
    margin: 0 2rem 0 2rem;
    padding: 0;
  }
}
.card-image {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.card-icon {
  padding: 1.2rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
}
.card-content {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.header {
  margin-bottom: 2rem;
  font-weight: 600;
}
.content {
  font-weight: 300;
}
</style>
