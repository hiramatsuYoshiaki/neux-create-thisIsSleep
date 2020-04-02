export const state = () => ({
  review: [
    {
      id: 1,
      product: 1001,
      name: 'hworksdev',
      mail: 'hworksdev@gmail.com',
      title: 'id1 product review 1001 ',
      post: 'greate photo tour! Thanks!',
      date: '2020-04-01',
      rait: 5
    },
    {
      id: 2,
      product: 1001,
      name: 'hworksdemo',
      mail: 'hworksdemo@gmail.com',
      title: 'id2 product review 1001',
      post: 'Nice Products!',
      date: '2020-04-02',
      rait: 4
    },
    {
      id: 3,
      product: 1001,
      name: 'hworksprod',
      mail: 'hworksprod@gmail.com',
      title: 'id3 product review 1001',
      post: 'Awesome Place!',
      date: '2020-04-03',
      rait: 3
    },
    {
      id: 4,
      product: 1001,
      name: 'hworksprod',
      mail: 'hworksprod@gmail.com',
      title: 'id4 product review 1001',
      post: 'Bay Cruse Beautiful View!!',
      date: '2020-04-04',
      rait: 2
    },
    {
      id: 5,
      product: 1002,
      name: 'hworksprod',
      mail: 'hworksprod@gmail.com',
      title: 'id5 product review 1001',
      post: 'Safety Similater enjyoy !!',
      date: '2020-04-05',
      rait: 1
    },
    {
      id: 6,
      product: 1003,
      name: 'hworksprod',
      mail: 'hworksprod@gmail.com',
      title: 'id 6 product review 1001',
      post: 'Hotaruna Open deck Beautiful View!!',
      date: '2020-04-06',
      rait: 5
    },
    {
      id: 7,
      product: 1004,
      name: 'hworksprod',
      mail: 'hworksprod@gmail.com',
      title: 'id7 product review 1001',
      post: 'Fuji Ty viewing platform Beaufiful Night View!!',
      date: '2020-04-07',
      rait: 4
    }
  ]
})
export const getters = {
  fillterReviews: (state, getters, rootState) => {
    const result = state.review.filter((review) => {
      return review.product === Number(rootState.buy.selectedId)
    })
    return result
  }
}
