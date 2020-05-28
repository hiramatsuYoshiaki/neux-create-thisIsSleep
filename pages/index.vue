<template lang="pug">
  div.main-wrape
    div.mainLayout
      //- div.aside
      //-   section.sectionWrape aside menu
      //- div.contents
      //-   section.sectionWrape carousel
      //-   section.sectionWrape collection
      //-   section.sectionWrape solution
      //-   section.sectionWrape products
      //-   section.sectionWrape jurnal

      //- div.bside
      //-   section.sectionWrape bside menu

      div.contents
        //- section.sectionWrape
        //-   vueCarouselComponent
        section.section-wrape
          vueCarouselBGImageComponent
        section.section-wrape
          levelComponent(:items="items" :title="title")
        section.section-wrape
          levelOrderComponent(:items="orderItems" )
        section.section-wrape
          levelSolutionComponent(:items="solutionItems")
        section.section-wrape
          levelProductComponent(:title="productTitle")
        section.section-wrape
          levelJurnalComponent(:items="jurnalItems" :title="jurnalTitle")

      //- section.carouselContainer
      //-       vueCarouselComponent
      //-   div collection title
      //-   levelComponent
      //- section levelCards(order)
      //- section levelCards(sokutionsHome)
      //- section levelCards(products)
      //-section levelCards(jurnals)
      //- section.dummySection dummy section
      //- 480
      //- 1024
</template>

<script>
// import axios from 'axios'
// import { mapState } from 'vuex'
// import { INIT_TODO } from '~/store/actionTypes'
// import vueCarouselComponent from '~/components/carousel/vueCarouselComponent.vue'
import vueCarouselBGImageComponent from '~/components/carousel/vueCarouselBGImageComponent.vue'
import levelComponent from '~/components/level/levelComponent.vue'
import levelOrderComponent from '~/components/level/levelOrderComponent.vue'
import levelSolutionComponent from '~/components/level/levelSolutionComponent.vue'
import levelProductComponent from '~/components/level/levelProductComponent.vue'
import levelJurnalComponent from '~/components/level/levelJurnalComponent.vue'

export default {
  layout: 'layout3Parts',
  // layout: 'baseLayout',
  // layout: 'useLoginLayout',
  // layout: 'loginLayout',
  // layout: 'useLayout',
  // layout: 'loginHeader',
  // layout: 'topPage',
  // layout: 'default',
  // layout: 'custom',
  components: {
    // vueCarouselComponent,
    vueCarouselBGImageComponent,
    levelComponent,
    levelOrderComponent,
    levelSolutionComponent,
    levelProductComponent,
    levelJurnalComponent
  },
  data() {
    return {
      productTitle: [
        { title: 'Fields Range' },
        { title: 'Photo Activity For Your Best,' },
        { title: 'We want to be better' }
      ],
      title: 'OUR COLLECTION',
      jurnalTitle: 'DISCOVER BLOG',
      items: [
        {
          id: 1,
          img: require('~/assets/img/img3614.jpg'),
          title: 'Bay Side Cycling',
          subTitle: 'Discover the most amazing spot around the japan',
          price: 2000,
          link: 'explore Now',
          to: '/account/registration',
          date: '2019-01-01',
          featured: 100,
          selling: 100
        },
        {
          id: 2,
          img: require('~/assets/img/img2731.jpg'),
          title: 'Safety Cycle Scholl',
          subTitle: 'Get inspired by the buzz of the Amusement ',
          price: 1200,
          link: 'explore Now',
          to: '/contact/countactUs',
          date: '2019-01-02',
          featured: 20,
          selling: 70
        },
        {
          id: 3,
          img: require('~/assets/img/img3668.jpg'),
          title: 'SkyTree Odaiba Tour',
          subTitle: 'River cruise on a futuristic design ship',
          price: 5000,
          link: 'return to home ',
          to: '/account/registration',
          date: '2019-01-03',
          featured: 90,
          selling: 20
        },
        {
          id: 4,
          img: require('~/assets/img/img3809.jpg'),
          title: 'Odaiba Night Cycling',
          subTitle: 'Amazing view from the observation deck',
          price: 3000,
          link: 'return to home ',
          to: '/account/registration',
          date: '2019-01-04',
          featured: 50,
          selling: 50
        }
      ],
      orderItems: [
        {
          title: 'Reliable support system ',
          subTitle:
            'There is a safe support system that other travel agencies do not have, such as 24-hour Japanese language support at travel destinations.',
          link: 'explore Now',
          to: '/account/registration',
          icon: 'fas fa-headset',
          id: 0,
          isShowIcon: false,
          isShowTitle: false
        },
        {
          title: 'Travel insurance ',
          subTitle:
            'You can compare and join from multiple insurance companies. Please feel free to consult us about how to choose insurance. ',
          link: 'explore Now',
          to: '/contact/countactUs',
          icon: 'fas fa-plane',
          id: 1,
          isShowIcon: false,
          isShowTitle: false
        },
        {
          title: 'Security',
          subTitle: `An organizational and technical management system has been established to ensure information security.
Perform safe and appropriate management and operation.`,
          link: 'return to home ',
          to: '/account/registration',
          icon: 'fas fa-shield-alt',
          id: 2,
          isShowIcon: false,
          isShowTitle: false
        },
        {
          title: 'First trip',
          subTitle:
            'It is natural that questions and anxieties accompany the first trip. First of all, we have compiled the information you want to check, such as the reservation flow, travel insurance, and local information.',
          link: 'return to home ',
          to: '/account/registration',
          icon: 'far fa-grin-beam-sweat',
          id: 3,
          isShowIcon: false,
          isShowTitle: false
        }
      ],
      solutionItems: [
        {
          bgimg: require('~/assets/img/img1578.jpg')
        },
        {
          bgimg: require('~/assets/img/img2722.jpg')
        },
        {
          bgimg: require('~/assets/img/img3809.jpg')
        }
      ],
      jurnalItems: [
        {
          img: require('~/assets/img/img0748.jpg'),
          title: 'Tokyo Marunouchi building',
          subTitle: 'Discover the most amazing spot around the japan',
          link: 'explore Now',
          to: '/account/registration',
          // imgW: 914,
          // imgH: 1280
          imgW: 800,
          imgH: 1280
        },
        {
          img: require('~/assets/img/img1117.jpg'),
          title: 'Tokyo universal foramu',
          subTitle: 'Get inspired by the buzz of the Amusement ',
          link: 'explore Now',
          to: '/contact/countactUs',
          // imgW: 800,
          // imgH: 1280
          imgW: 900,
          imgH: 1440
        },
        {
          img: require('~/assets/img/img1559_800x800.jpg'),
          title: 'iluminations',
          subTitle: 'River cruise on a futuristic design ship',
          link: 'return to home ',
          to: '/account/registration',
          imgW: 800,
          imgH: 800
        }
      ]
    }
  }

  // async asyncData({}) {
  //   const { data } = await axios.get(`https://www.instagram.com/p/BzqBMl3g9vA/`)
  //   return { title: data.title }
  // }
  // computed: {
  //   ...mapState(['items'])
  // },
  // created() {
  //   console.log('create')
  //   this.$store.dispatch(INIT_TODO)
  // }
  // methods: {
  //   link_commit(linkPath) {
  //     this.active = true
  //     this.$store.commit('pagePathSet', linkPath)
  //     console.log('linkPath: ' + linkPath)
  //     setTimeout(() => {
  //       if (linkPath === '/about') {
  //         location.href = linkPath // reload
  //       } else {
  //         this.$router.push({ path: linkPath }) // non-leload
  //       }
  //     }, 500)
  //   }
  // }
}
</script>
<style lang="scss" scoped>
$section-color: #fff;
$section-text: #000;
$section-padding-top: 3rem;
$section-padding-bottom: 3rem;
$section-padding-right: 0;
$section-padding-left: 0;
.main-wrape {
  margin-top: $header-height;
}
.mainLayout {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 992px) {
    flex-direction: row;
  }
}
// .aside {
//   width: 100%;
//   @media (min-width: 992px) {
//     width: 25%;
//   }
// }
// .contents {
//   width: 100%;
//   @media (min-width: 992px) {
//     width: 50%;
//   }
// }
.contents {
  width: 100%;
  @media (min-width: 992px) {
    width: 100%;
  }
}
// .bside {
//   width: 100%;
//   @media (min-width: 992px) {
//     width: 25%;
//   }
// }
.section-wrape {
  width: 100%;
  padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  background-color: rgba(0, 0, 0, 0.1);
  // border: 1px dotted rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
}
</style>
