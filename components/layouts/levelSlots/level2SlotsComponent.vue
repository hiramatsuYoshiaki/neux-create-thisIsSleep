<template lang="pug">
    div.container-fluid
        div.row
            section.slot-section.col-12.col-sm-6
                div.slot-leve1
                    slot(name="leve1")
            section.slot-section.col-12.col-sm-6
                div.slot-leve2
                    slot(name="leve2")
</template>
<style scoped lang="scss">
.slot-section {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid green;
}
.slot-leve1 {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid violet;
}
</style>
