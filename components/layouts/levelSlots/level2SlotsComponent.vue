<template lang="pug">
    div.container
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
  overflow: hidden;
}
.slot-leve1 {
  position: relative;
  overflow: hidden;
}
.slot-leve2 {
  position: relative;
  overflow: hidden;
}
</style>
