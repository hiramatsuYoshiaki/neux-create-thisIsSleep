export const state = () => ({
  selectedQuestion: 1,
  questionsTest: [
    {
      id: 1,
      ques: 'Do you notice that you move around a lot when you sleep?',
      ansr: [
        { mark: 'A', ans: 'YES', ansText: 'I tend to move around a lot' },
        {
          mark: 'B',
          ans: 'NO',
          ansText: 'I useually waik to simmiler position'
        }
      ]
    },
    {
      id: 2,
      ques: 'Do you often get to hot during the night?',
      ansr: [
        {
          mark: 'A',
          ans: 'YES',
          ansText: 'I regulaly straggle to stay cool'
        },
        { mark: 'B', ans: 'NO', ansText: 'I never had issuse in heat' }
      ]
    },
    {
      id: 3,
      ques: 'Are you aware any allergies you might have',
      ansr: [
        {
          mark: 'A',
          ans: 'YES',
          ansText: 'I require hypoallergenic bedding'
        },
        {
          mark: 'B',
          ans: 'NO aware',
          ansText: 'Sometime have a runney,itchy nose or nasal congestion'
        },
        { mark: 'C', ans: 'NO', ansText: 'I dont have any allergies' }
      ]
    },
    {
      id: 4,
      ques: 'In what position do you usually  sllep in?',
      ansr: [
        {
          mark: 'A',
          ans: 'My back or side',
          ansText: ''
        },
        {
          mark: 'B',
          ans: 'My Front',
          ansText: ''
        },
        { mark: 'C', ans: 'Cheng my position', ansText: '' },
        { mark: 'D', ans: 'I,m not sure', ansText: '' }
      ]
    }
  ]
})
