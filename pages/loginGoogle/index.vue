<template>
  <div class="container">
    <div class="bgImageFull">
      <transition name="bgTran" appear>
        <div
          :style="{ 'background-image': 'url(' + img + ') ' }"
          class="bgImage"
        >
          <div class="bg_filter" />
        </div>
      </transition>
    </div>
    <div class="content-header">
      <ConHeader
        :page-title="pageTitle"
        :page-sub-title="pageSubTitle"
        :page-discription="pageDiscription"
        :page-discription-detail="pageDiscriptionDetail"
      />
    </div>
    <transition name="mainCon" appear>
      <div class="content-main">
        <conLoginGoogle />
      </div>
    </transition>
    <transition name="mainCon" appear>
      <div class="content-footer">
        <ContentFooter />
      </div>
    </transition>
    <transition appear name="transitionScreen">
      <TransitionScreen v-if="page === '/loginGoogle'" />
    </transition>
  </div>
</template>

<script>
import TransitionScreen from '~/components/transition/TransitionScreen.vue'

import conLoginGoogle from '~/components/content/loginGoogle/conLoginGoogle.vue'
import ConHeader from '~/components/content/ConHeader.vue'
import ContentFooter from '~/components/content/ContentFooter.vue'
export default {
  layout: 'topPage',
  components: {
    TransitionScreen,
    ConHeader,
    conLoginGoogle,
    ContentFooter
  },
  data() {
    return {
      img: require('~/assets/img/fuji1.jpg'),
      pageTitle: 'Auth',
      pageSubTitle: 'Firebase',
      pageDiscription: 'Authentication',
      pageDiscriptionDetail:
        'Vue.jsのフレームワークNuxt.jsでFirebaseを使って認証するデモ'
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: 'description',
          name: 'LoginGoogle by Nuxt.js',
          content:
            'このページは、Vue.jsフレームワークのNuxt.jsを使って作成したWebサイトの概略を紹介しています。'
        }
      ]
    }
  },
  computed: {
    page() {
      return this.$store.state.page
    }
  },
  methods: {
    link_commit(linkPath) {
      this.$store.commit('pagePathSet', linkPath)
      console.log('linkPath: ' + linkPath)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
      }, 500)
    }
  }
}
</script>
<style scoped lang="scss">
%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
%left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
%right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.container {
  position: relative;
  width: 100vw;
  height: 100%;
  margin-top: $header-height;
  @extend %center;
  flex-direction: column;
}
.content-header {
  width: 100vw;
  height: 35vh;
}
.content-main {
  width: 100vw;
  background-color: $main-contents-color;
  color: $main-contents-text;
}
.content-footer {
  width: 100vw;
  @extend %center;
  flex-direction: column;
}
</style>
