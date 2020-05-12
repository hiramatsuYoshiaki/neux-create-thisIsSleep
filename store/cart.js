export const state = () => ({
  products: [],
  cartItems: [],
  checkoutStatus: null,
  shoppingCart: false
})

export const mutations = {
  // pushProductToCart(state, { id }) {
  //   state.cartItems.push({
  //     id,
  //     quantity: 1
  //   })
  // },
  pushProductToCart(state, cartItem) {
    // console.log('push quantity: ' + cartItem.quantity)
    state.cartItems.push({
      id: cartItem.id,
      title: cartItem.title,
      subTitle: cartItem.subTitle,
      price: cartItem.price,
      inventory: cartItem.inventory,
      img: cartItem.img,
      quantity: cartItem.quantity
    })
  },
  removeProductToCart(state, key) {
    // console.log(state.cartItems[key])
    state.cartItems.splice(key, 1)
    // state.cartItems.delete(key)
    // state.cartItems.remove([key])
  },
  incrementItemQuantity(state, cartProduct) {
    // console.log('increment')
    const cartItem = state.cartItems.find((item) => {
      return item.id === cartProduct.id
    })
    cartItem.quantity = cartItem.quantity + cartProduct.quantity
  },

  // setCartItems(state, { items }) {
  //   state.cartItems = items
  // },
  setCartItems(state) {
    state.cartItems = []
  },
  setClearProducts(state) {
    state.products = []
  },
  setAllProducts(payload) {
    state.products = payload
  },
  setCheckoutStatus(state, payload) {
    state.checkoutStatus = payload
  },

  setShoppingCart(state, payload) {
    state.shoppingCart = payload
  },
  addProduct(state, payload) {
    state.products.push(payload)
  }
}

export const getters = {
  cartProducts: (state, getters, rootState) => {
    // console.info('getters cart Products')
    return state.cartItems.map(({ id, quantity }) => {
      const cartData = rootState.sleepProducts.find((product) => {
        return product.id === id
      })
      const productTotal = quantity * cartData.price
      return {
        id: cartData.id,
        title: cartData.title,
        subTitle: cartData.subTitle,
        price: cartData.price,
        inventory: cartData.inventory,
        img: cartData.img,
        quantity: quantity,
        productTotal: productTotal
      }
    })
  },
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

export const actions = {
  checkout({ commit, state }, products) {
    // console.info('action checkout start')
    // const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // commit('setCartItems', { cartItems: [] }) // empty cart
    commit('setCartItems') // empty cart
    // shop.buyProducts(
    //   products,
    //   () => commit("setCheckoutStatus", "successful"),//ok
    //   () => {
    //     commit("setCheckoutStatus", "failed");
    //     // rollback to the cart saved before sending the request
    //     commit("setCartItems", { items: savedCartItems });
    //   }//error
    // );
    commit('setCheckoutStatus', 'successfull')
  },
  addProductToCartAction({ state, commit }, product) {
    commit('setCheckoutStatus', null)
    if (product.inventory >= product.quantity) {
      const cartItem = state.cartItems.find((item) => {
        return item.id === product.id
      })
      if (!cartItem) {
        commit('pushProductToCart', {
          id: product.id,
          title: product.title,
          subTitle: product.subTitle,
          price: product.price,
          inventory: product.inventory,
          img: product.img,
          quantity: product.quantity
        })
      } else {
        commit('incrementItemQuantity', product)
      }
      // 在庫減らす
      // commit(
      //   'products/decrementProductInventory',
      //   { id: product.id },
      //   { root: true }
      // )
      // commit('decrementProductInventory', { id: product.id }, { root: true })
    }
  },
  removeProductToAction({ state, commit }, removeId) {
    console.log('removeId' + removeId.id)
    console.log('removekey' + removeId.key)
    const cartItem = state.cartItems.find((item) => {
      // console.log('find: ' + product.id)
      return item.id === removeId.id
    })
    if (cartItem) {
      commit('removeProductToCart', removeId.key)
    } else {
      console.log('error nothing remove item')
    }
    // commit('addProductInventory', { id: removeId.id }, { root: true })
  },
  removeProductCart({ state, commit }, removeItem) {
    console.log('removeProductCart')
    console.log(removeItem.id)

    // console.log('removeId' + removeId.id)
    // console.log('removekey' + removeId.key)
    const cartIndex = state.cartItems.findIndex((item) => {
      // console.log('find: ' + product.id)
      return item.id === removeItem.id
    })
    console.log(cartIndex)
    if (cartIndex === -1) {
      // console.log('error nothing remove item')
    } else {
      commit('removeProductToCart', cartIndex)
    }
  }
}
