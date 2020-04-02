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
    console.log('push quantity: ' + cartItem.quantity)
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
  incrementItemQuantity(state, { id }) {
    console.log('increment')
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
      const cartData = rootState.products.all.find((product) => {
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
    console.log('cartProductToCartAction product: ' + product.id)
    console.log('cartProductToCartAction cartItems: ' + state.cartItems)
    console.log(state.cartItems)

    commit('setCheckoutStatus', null)
    // if (product.inventory > 0) {
    if (product.inventory >= product.quantity) {
      const cartItem = state.cartItems.find((item) => {
        console.log('find: ' + product.id)
        return item.id === product.id
      })

      if (!cartItem) {
        // commit('pushProductToCart', { id: product.id })
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
