export const state = () => ({
  all: [
    {
      id: 1001,
      img: require('~/assets/img/img3614.jpg'),
      title: 'Bay Cruse Tour ',
      subTitle: 'Discover the most amazing spot around the japan',
      price: 800,
      link: 'explore Now',
      to: '/account/registration',
      date: '2019-01-01',
      featured: 100,
      selling: 100,
      inventory: 100
    },
    {
      id: 1002,
      img: require('~/assets/img/img2731.jpg'),
      title: 'Safety Cycle Scholl',
      subTitle: 'Get inspired by the buzz of the Amusement ',
      price: 0,
      link: 'explore Now',
      to: '/contact/countactUs',
      date: '2019-01-02',
      featured: 20,
      selling: 70,
      inventory: 100
    },
    {
      id: 1003,
      img: require('~/assets/img/img3668.jpg'),
      title: 'Hotalna Tour',
      subTitle: 'River cruise on a futuristic design ship',
      price: 2000,
      link: 'return to home ',
      to: '/account/registration',
      date: '2019-01-03',
      featured: 90,
      selling: 20,
      inventory: 100
    },
    {
      id: 1004,
      img: require('~/assets/img/img3809.jpg'),
      title: 'Odaiba Tour',
      subTitle: 'Amazing view from the observation deck',
      price: 1200,
      link: 'return to home ',
      to: '/account/registration',
      date: '2019-01-04',
      featured: 50,
      selling: 50,
      inventory: 10
    }
  ]
})
// export const actions = {
//   getAllProducts({ commit }) {
//     shop.getProducts((products) => {
//       commit('setProducts', products)
//     })
//   }
// }
export const mutations = {
  setProducts(state, products) {
    state.all = products
  },
  decrementProductInventory(state, { id }) {
    const product = state.all.find((product) => {
      return product.id === id
    })
    product.inventory--
  }
}
