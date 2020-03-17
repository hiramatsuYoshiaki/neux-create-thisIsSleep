<template lang="pug">
  div.main-wrape
    div.container-fluid
        div.row
            level2SlotsComponent
                template(v-slot:leve1)
                    div.slot-wrape.level1-wrape
                        section.title
                            h5 FAQ
                            div.h7 We’re here to help you get the best sleep possible. Have a question? See if we’ve answered it before.
                template(v-slot:leve2)
                    div.slot-wrape.level2-wrape
                        div.faq
                            section.title
                              div(v-for="(faq, index ) in faqs " :key="faq.id")
                                div(v-if="faq.sectionName")
                                  h6 {{faq.sectionName}}
                                div.toggle-section
                                    div.toggle-header
                                        div.h7.toggle-header(@click="toggleAction(index)")
                                            span.toggle-open(v-if="!faq.isOpen") <i class="fas fa-plus "></i>
                                            span.toggle-close(v-if="faq.isOpen") <i class="fas fa-minus "></i>
                                            | {{faq.header}}
                                    div.toggle-content.wrapper(ref="wrapper")
                                        div.h7.toggle-text {{faq.answer}}
                                            span.faq-link(v-if="faq.linkUrl")
                                                nuxt-link(v-bind:to="faq.linkUrl") {{faq.link}}

</template>
<script>
import level2SlotsComponent from '~/components/layouts/levelSlots/level2SlotsComponent.vue'
export default {
  layout: 'layout3Parts',
  components: {
    level2SlotsComponent
  },
  data() {
    return {
      isError: false,
      isOpen: false,
      height: null,
      faqs: [
        {
          id: 1,
          sectionName: 'Delivery & Returns',
          header: 'Can I return an item?',
          answer:
            'Of course, we’re happy to offer 30-day returns on any part of your sleep solution. For more info on how to arrange it, follow the notes on our delivery & returns,',
          link: 'page',
          linkUrl: '/',
          height: null,
          isOpen: false
        },
        {
          id: 2,
          sectionName: null,
          header: 'What are you returns terms and conditions?',
          answer: 'You can find all of our T&C’s',
          link: 'here',
          linkUrl: '/',
          height: null,
          isOpen: false
        },
        {
          id: 3,
          sectionName: null,
          header: 'When will my order be delivered?',
          answer:
            'As soon as humanly possible (aka: next day for most UK orders).',
          link: null,
          linkUrl: null,
          height: null,
          isOpen: false
        },
        {
          id: 4,
          sectionName: null,
          header: 'I received the wrong size/tog/product, can I exchange this?',
          answer:
            'We’re sorry! Please get in touch with our sleep support team and we’ll get you sorted.',
          link: null,
          linkUrl: null,
          height: null,
          isOpen: false
        },
        {
          id: 5,
          sectionName: 'My order & ordering',
          header: 'I’ve made a mistake on my order, can I change it?',
          answer:
            'If you’ve already paid, unfortunately, we can only amend your delivery details. If you need to change an item from your order, get in touch and we can arrange a speedy return or exchange. Make sure you email the Sleep Support Team and quote your order number and the change you wish to make. We’ll see what we can do.',
          link: null,
          linkUrl: null,
          height: null,
          isOpen: false
        },
        {
          id: 6,
          sectionName: null,
          header: 'I’m having issues placing my order.',
          answer:
            'We’re sorry that you’re having trouble. Please get in touch with a description of your issue and make sure to let us know what device and browser you’re using (screenshots help!).',
          link: null,
          linkUrl: null,
          height: null,
          isOpen: false
        },
        {
          id: 7,
          sectionName: 'Product',
          header: 'What is tog?',
          answer:
            'A duvet’s tog rating tells you how warm it will be; the higher the tog, the warmer the duvet. Our most popular tog is 10.5 which is a normal winter duvet, if you get extra cold, we also offer a 13.5 and for summer we offer a lighter version at 4.5 tog. Young children shouldn’t sleep with anything warmer than 4.5 tog.',
          link: null,
          linkUrl: null,
          height: null,
          isOpen: false
        },
        {
          id: 8,
          sectionName: null,
          header: 'How do I wash my duvet/pillow/mattress topper/protector?',
          answer:
            'It sounds obvious, but make sure you read the instructions. We’ve included everything you need to know right there on the product. Double check before you put it in because different products have different needs (just like you and me).',
          link: null,
          linkUrl: null,
          height: null,
          isOpen: false
        },
        {
          id: 9,
          sectionName: null,
          header: 'How do I dry my products after washing?',
          answer:
            'We recommend air drying all of our products. A great way to know if it’s completely dry is to pop it on the bathroom scale before and after you wash it. If it’s heavier after, you need to give it a bit more time. As with washing, everything you need to know is right there on the label.',
          link: null,
          linkUrl: null,
          height: null,
          isOpen: false
        },
        {
          id: 10,
          sectionName: null,
          header: 'How is the OriginalEco filling made?',
          answer:
            "We’re proud to have created a new generation of luxury bedding using silky soft fibres made out of recycled PET plastic bottles. Using a pioneering fibre-blowing technique, we can transform the bottles into individual down-like clusters that trap air and ensure insulation and warmth just like down and feathers. And there's more! As an added bonus, it holds up better longer so we can keep you warmer night after night.",
          link: null,
          linkUrl: null,
          height: null,
          isOpen: false
        },
        {
          id: 11,
          sectionName: null,
          header: 'What are your guarantees?',
          answer:
            'You can rest easy knowing that our pillows are guaranteed for one year and our duvets and mattress toppers are guaranteed for two!',
          link: null,
          linkUrl: null,
          height: null,
          isOpen: false
        }
      ]
    }
  },
  mounted() {
    this.faqs.forEach((value, index) => {
      // console.log(index + '番目 : ' + value)

      // const element = this.$refs.wrapper
      const element = this.$refs.wrapper[index]
      const { width } = getComputedStyle(element)
      /* eslint-disable no-param-reassign */
      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'
      /* eslint-enable */
      const { height } = getComputedStyle(element)
      /* eslint-disable no-param-reassign */
      element.style.width = null
      element.style.position = null
      element.style.visibility = null
      element.style.height = 0
      /* eslint-enable */
      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height
      // this.height = height
      this.faqs[index].height = height
      // console.log(this.height)
      console.log(this.faqs[index].height)
      // setTimeout(() => {
      //   // eslint-disable-next-line no-param-reassign
      //   element.style.height = height;
      // });
      //   this.elementHeight = this.$refs.tog.clientHeight
      //   console.log('toggleHeight:' + this.elementHeight)
      // this.isOpen = false
    })
  },

  methods: {
    toggleAction(clickIndex) {
      this.faqs.forEach((value, index) => {
        if (!clickIndex === index) {
          this.faqs[index].isOpen = false
          const el = this.$refs.wrapper[index]
          el.style.height = 0
        }
      })

      if (this.faqs[clickIndex].isOpen) {
        const el = this.$refs.wrapper[clickIndex]
        el.style.height = 0
        this.faqs[clickIndex].isOpen = false
      } else {
        const el = this.$refs.wrapper[clickIndex]
        el.style.height = this.faqs[clickIndex].height
        this.faqs[clickIndex].isOpen = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
}
.slot-wrape {
  padding: 2rem 2rem 1.2rem 2rem;
  @media (min-width: 992px) {
    padding: 8rem 1.2rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  a {
    color: black;
  }
}
.level1-wrape {
  padding-right: 4rem;
}
.level2-wrape {
  padding-right: 0.5rem;
  margin-top: -2rem;
}

.faq {
  margin-bottom: 2rem;
}
.title {
  h5 {
    font-weight: 600;
    margin-bottom: 2rem;
  }
  h6 {
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1.25rem;
  }
  .toggle-header {
    color: $black-bis;
    font-weight: 600;
  }
  .toggle-content .h7 {
    color: $grey-dark;
    font-weight: 300;
  }
}

.toggle-section {
  margin-bottom: 0rem;
}
.toggle-header {
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.toggle-open,
.toggle-close {
  margin-right: 0.5rem;
}
i.fa-plus,
i.fa-minus {
  font-size: 0.8rem;
  margin-top: -0.8rem;
  vertical-align: middle;
  margin-top: -0.2rem;
  display: inline-block;
}

.toggle-content {
  overflow: hidden;
}

.wrapper {
  transition: height 0.2s;
  overflow: hidden;
}
.faq-link a {
  margin-left: 0.5em;
  text-decoration: underline;
}
</style>
