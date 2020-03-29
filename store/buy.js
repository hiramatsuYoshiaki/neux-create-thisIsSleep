export const state = () => ({
  selectedId: null
})

export const mutations = {
  setSelectedId(state, id) {
    state.selectedId = id
  }
}

export const getters = {
  selectProduct: (state, getters, rootState) => {
    // console.log('state.selectedId ' + state.selectedId)
    const selectProduct = rootState.products.all.find((product) => {
      //   console.log(product.id)
      //   console.log(state.selectedId)
      return product.id === Number(state.selectedId)
    })
    return {
      id: selectProduct.id,
      img: selectProduct.img,
      title: selectProduct.title,
      subTitle: selectProduct.subTitle,
      price: selectProduct.price,
      link: selectProduct.link,
      to: selectProduct.to,
      date: selectProduct.date,
      featured: selectProduct.featured,
      selling: selectProduct.selling,
      inventory: selectProduct.inventory
    }
  }
}
