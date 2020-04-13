<template lang="pug">
    div.main-wrap
        div.container-fluid
            div.row
                canvas(id="canvas" ref="refs_canvas")
                div.ques-content(v-for="question in selectedPage()" :key="question.id")
                    div.ques-wrape
                        div.question
                            div.pageId
                                span.h7 {{quesId}}
                                span.h7 /
                                span.h7 {{totalQ}}
                            h4.quesTitle {{question.ques}}
                            div.doYouKnow
                                div.doYouKnowCatchWrap
                                    div.doYouKnowCatch
                                    div.doYouKnowMark.h6 ?
                                div.doYouKnowText Do you know?

                    div.ques-wrape
                        div.anser
                            div.anser-element(v-for="ans in question.ansr" )
                                div.anser-title-wrap(@click="nextPage()")
                                    div.anser-title
                                    div.anser-title-mark.h6 {{ans.mark}}
                                div.anser-items(@click="nextPage()")
                                    div.h7 {{ans.ans}}
                                    div.h7 {{ans.ansText}}
                            //- div.anser-element
                            //-     div.anser-title
                            //-         p B
                            //-     div.anser-items
                            //-         h6 No
                            //-         div.h7 I useually waik to simmiler position
                //- div.create
                    div(v-for="question in selectedPage()" :key="question.id")
                        h3 {{question.id}}
                        p {{question.ques}}
                        //- p {{question.ansr}}
                        div(v-for="(ans , ansIndex) in question.ansr" :key="ansIndex")
                                p {{ans.mark}}
                                p {{ans.ans}}
                                p {{ans.ansText}}
                    //- p {{questions}}
                //- div.create
                    //- button(@click="createQuestions()")
                    //-     h3  create questions

</template>
<script>
import { mapState } from 'vuex'
// import { SLEEP_QUESTIONS_CREATE, GET_QUESTION_DATA } from '~/store/actionTypes'
import { GET_QUESTION_DATA } from '~/store/actionTypes'
export default {
  layout: 'layout2Parts',
  data() {
    return {
      quesId: this.$route.params.slug,
      totalQ: 1
      //   questions: [
      //     {
      //       id: 1,
      //       ques: 'Do you notice that you move around a lot when you sleep?',
      //       ansr: [
      //         { mark: 'A', ans: 'YES', ansText: 'I tend to move around a lot' },
      //         {
      //           mark: 'B',
      //           ans: 'NO',
      //           ansText: 'I useually waik to simmiler position'
      //         }
      //       ]
      //     },
      //     {
      //       id: 2,
      //       ques: 'Do you often get to hot during the night?',
      //       ansr: [
      //         {
      //           mark: 'A',
      //           ans: 'YES',
      //           ansText: 'I regulaly straggle to stay cool'
      //         },
      //         { mark: 'B', ans: 'NO', ansText: 'I never had issuse in heat' }
      //       ]
      //     }
      //   ]
    }
  },
  computed: {
    ...mapState({ questions: 'sleepQuestions' }) // products
    // ...mapState('questions', { questions: 'questionsTest' }) // develop
  },
  async mounted() {
    await this.$store.dispatch(GET_QUESTION_DATA)
  },
  methods: {
    selectedPage() {
      const selectedQues = []
      let cnt = 0
      for (const ques in this.questions) {
        if (this.questions[ques].id === Number(this.$route.params.slug)) {
          selectedQues.push(this.questions[ques])
        }
        cnt++
      }
      this.totalQ = cnt
      return selectedQues
    },
    nextPage() {
      const addPage = Number(this.$route.params.slug) + 1
      if (addPage > this.totalQ) {
        this.$router.push('/')
      } else {
        this.$router.push(`/thisIsSleep/solution/question/${addPage}`)
      }
    }
    // initial data create firebase
    // createQuestions() {
    //   alert('create test data')
    //   this.$store.dispatch(SLEEP_QUESTIONS_CREATE, this.questions)
    // }
  }
}
</script>
<style lang="scss" scoped>
// * {
//   border: 1px dotted green;
// }
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgb(205, 211, 216);
  overflow: hidden;
}
.ques-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: $header-height;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;
  @media (min-width: 992px) {
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
}
.ques-wrape {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 1.5rem 0 1.5rem;
  @media (min-width: 992px) {
    width: 50%;
    height: 100%;
    // padding: 0 5rem 0 1.5rem;
    align-items: flex-start;
  }
  @media (min-width: 1200px) {
    width: 50%;
    height: 100%;
    // padding: 0 10rem 0 1.5rem;
    align-items: flex-start;
  }
  //   .question {
  //     margin-left: 0;
  //     @media (min-width: 1200px) {
  //       margin-left: 10rem;
  //       margin-right: 10rem;
  //     }
  //   }
  .question,
  .anser {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    @media (min-width: 576px) {
      width: 540px;
    }
    @media (min-width: 992px) {
      width: 100%;
      align-items: flex-start;
    }
  }
}
.question {
  border: 1px solid red;
  color: $grey-darker;
  h4 {
    font-weight: $weight-semibold;
    line-height: 1.2;
    margin-bottom: 1rem;
    padding-bottom: 2rem;
  }
  h6 {
    font-weight: $weight-light;
    margin-bottom: 1rem;
  }
  .h7 {
    font-weight: $weight-light;
    margin-right: 0.2rem;
  }
  .pageId {
    margin-bottom: 1rem;
  }
  .doYouKnow {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
  .doYouKnowCatchWrap {
    position: relative;
  }
  .doYouKnowCatch {
    display: block;
    width: 2rem;
    height: 2rem;
    margin-right: 0.8rem;
    border: 1px solid $grey-darker;
    border-radius: 50%;
    background: $grey-darker;
    color: $white;
  }
  .doYouKnowMark {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-100%, -55%);
    color: $white;
  }
  .doYouKnowText {
    display: inline-block;
    width: 100%;
  }
}
.anser-element {
  color: $white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  cursor: pointer;

  .anser-title-wrap {
    position: relative;
  }
  .anser-title {
    margin: 1rem;
    display: block;
    width: 3rem;
    height: 3rem;
    border: 2px solid $white;
    border-radius: 50%;
  }
  .anser-title-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
  }
  &:hover {
    color: $grey-darker;
    .anser-title {
      border: 2px solid $grey-darker;
    }
  }
}
</style>
