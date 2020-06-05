export const state = () => ({
  selectedId: 1001,
  selectedInventory: 0,
  selectedProductBuy: {},
  reviewErrors: []
})

export const mutations = {
  setSelectedId(state, id) {
    state.selectedId = id
  },
  setSelectedInventory(state, payload) {
    state.selectedInventory = payload
  },
  setSelectedProduct(state, payload) {
    state.selectedProductBuy = payload
  },

  setRevueError(state, payload) {
    state.reviewErrors.push(payload)
  },
  clearRevueError(state) {
    state.reviewErrors.splice(0)
  }
}

export const getters = {
  selectProduct: (state, getters, rootState) => {
    console.log('selectProduct')
    console.log('selectedId:' + Number(state.selectedId))
    console.log('sleepProducts:' + rootState.sleepProducts)
    // console.log('state.selectedId ' + state.selectedId)
    // const selectProduct = rootState.products.all.find((product) => {
    //   console.log('all id ' + product.id)
    //   console.log('all inventory ' + product.inventory)
    //   return product.id === Number(state.selectedId)
    // })
    const selectProduct = rootState.sleepProducts.find((product) => {
      return product.id === Number(state.selectedId)
    })
    if (selectProduct) {
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
        inventory: selectProduct.inventory,
        bikeType: selectProduct.bikeType,
        timeZone: selectProduct.timeZone,
        tourDate: selectProduct.tourDate
      }
    }
  },
  getErrorBgColorName: (state, getters, rootState) => {
    // console.log(state.reviewErrors)
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
    // console.log(state.reviewErrors)
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
    // console.log(state.reviewErrors)
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
    // console.log(state.reviewErrors)
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
