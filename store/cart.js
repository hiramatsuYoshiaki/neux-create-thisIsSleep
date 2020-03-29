export const state = () => ({
  products: [],
  cartItems: [],
  checkoutStatus: null,
  shoppingCart: false
})

export const mutations = {
  pushProductToCart(state, { id }) {
    state.cartItems.push({
      id,
      quantity: 1
    })
  },
  incrementItemQuantity(state, { id }) {
    const cartItem = state.cartItems.find((item) => {
      return item.id === id
    })
    cartItem.quantity++
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
    console.info('setCheckoutStatus')
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
    console.info('getters cart Products')
    return state.cartItems.map(({ id, quantity }) => {
      const cartData = rootState.products.all.find((product) => {
        return product.id === id
      })
      return {
        title: cartData.title,
        price: cartData.price,
        quantity
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
    console.info('action checkout start')
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
    console.log('check out: ' + product.title)
    commit('setCheckoutStatus', null)
    if (product.inventory > 0) {
      const cartItem = state.cartItems.find((item) => {
        return item.id === product.id
      })

      if (!cartItem) {
        commit('pushProductToCart', { id: product.id })
      } else {
        commit('incrementItemQuantity', cartItem)
      }
      // 在庫減らす
      commit(
        'products/decrementProductInventory',
        { id: product.id },
        { root: true }
      )
    }
  }
}
