export const state = () => ({
  selectedId: null,
  reviewErrors: []
})

export const mutations = {
  setSelectedId(state, id) {
    state.selectedId = id
  },
  setRevueError(state, payload) {
    console.log(payload)
    state.reviewErrors.push(payload)
  },
  clearRevueError(state) {
    state.reviewErrors.splice(0)
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
  },
  getErrorBgColorName: (state, getters, rootState) => {
    console.log(state.reviewErrors)
    const errorCheck = state.reviewErrors.find((error) => {
      return error.check === 'name'
    })
    if (errorCheck) {
      return errorCheck.bg
    } else {
      return '#e3f2fd'
    }
  },
  getErrorBgColorMail: (state, getters, rootState) => {
    console.log(state.reviewErrors)
    const errorCheck = state.reviewErrors.find((error) => {
      return error.check === 'mail'
    })
    if (errorCheck) {
      return errorCheck.bg
    } else {
      return '#e3f2fd'
    }
  },
  getErrorBgColorTitle: (state, getters, rootState) => {
    console.log(state.reviewErrors)
    const errorCheck = state.reviewErrors.find((error) => {
      return error.check === 'title'
    })
    if (errorCheck) {
      return errorCheck.bg
    } else {
      return '#e3f2fd'
    }
  },
  getErrorBgColorReview: (state, getters, rootState) => {
    console.log(state.reviewErrors)
    const errorCheck = state.reviewErrors.find((error) => {
      return error.check === 'review'
    })
    if (errorCheck) {
      return errorCheck.bg
    } else {
      return '#e3f2fd'
    }
  }
}
