export const state = () => ({
  products: [],
  cartItems: [],
  // userCarts: [],
  userCartItems: [],
  checkoutStatus: null,
  shoppingCart: false
})

export const mutations = {
  // setUserCarts(state, cart) {
  //   state.userCarts = cart
  // },
  // pushProductToCart(state, { id }) {
  //   state.cartItems.push({
  //     id,
  //     quantity: 1
  //   })
  // },
  pushProductToCart(state, cartItem) {
    // console.log('pushProductToCart state ')
    state.cartItems.push(cartItem)
    // state.cartItems.push({
    //   id: cartItem.id,
    //   title: cartItem.title,
    //   subTitle: cartItem.subTitle,
    //   price: cartItem.price,
    //   inventory: cartItem.inventory,
    //   img: cartItem.img,
    //   quantity: cartItem.quantity,
    //   bikeType: cartItem.bikeType,
    //   tourDate: cartItem.tourDate,
    //   timeZone: cartItem.timeZone
    // })
  },
  removeProductToCart(state, key) {
    // console.log(state.cartItems[key])
    state.cartItems.splice(key, 1)
    // state.cartItems.delete(key)
    // state.cartItems.remove([key])
  },
  updateProductToCart(state, updateData) {
    // console.log('update product to cart----------')
    // console.log(updateData.item.id)
    // console.log(updateData.item.tourDate.date)
    // console.log(updateData.item.timeZone.zone)
    // console.log(updateData.item.bikeType.type)
    // console.log(updateData.key)
    state.cartItems.splice(updateData.key, 1, updateData.item)
  },

  incrementItemQuantity(state, cartProduct) {
    // console.log('increment')
    const cartItem = state.cartItems.find((item) => {
      return item.id === cartProduct.id
    })
    cartItem.quantity = cartItem.quantity + cartProduct.quantity
  },
  incrementUserCartQuantity(state, userKey) {
    // console.log('incrementUserCartQuantity')
    // console.log(userKey)
    const cartItem = state.cartItems.find((item) => {
      // console.log(item)
      return (
        item.id === userKey.id &&
        item.tourDate.code === userKey.tourDateCode &&
        item.timeZone.code === userKey.timeZoneCode &&
        item.loginUid === userKey.loginUid
      )
    })
    cartItem.quantity = cartItem.quantity + userKey.quantity
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
  getAcceptOrdersCheck: (state, getters, rootState) => (value) => {
    let total = 0
    state.cartItems.forEach((cart) => {
      if (value.id === cart.id) {
        total = total + cart.quantity
      }
    })
    return value.inventory - total - value.quantity
  },
  getAcceptOrders: (state, getters, rootState) => (item) => {
    let total = 0
    state.cartItems.forEach((cart) => {
      if (item.id === cart.id) {
        total = total + cart.quantity
      }
    })
    return item.inventory - total
  },
  getUserCart: (state, getters, rootState) => (uid) => {
    // console.log(uid)
    const userCart = []
    state.cartItems.map((item) => {
      if (item.loginUid === uid) {
        const cartData = rootState.sleepProducts.find((product) => {
          return product.id === item.id
        })
        const productTotal = item.quantity * cartData.price
        // console.log(productTotal)
        const product = {
          id: cartData.id,
          title: cartData.title,
          subTitle: cartData.subTitle,
          price: cartData.price,
          inventory: cartData.inventory,
          quantity: item.quantity,
          bikeType: item.bikeType,
          tourDate: item.tourDate,
          timeZone: item.timeZone,
          orderKey: item.orderKey,
          productTotal: productTotal,
          loginUid: item.loginUid
        }
        userCart.push(product)
      }
    })
    return userCart
  },
  getUserCartTotal: (state, getters, rootState) => (uid) => {
    // console.log('userCartTotal')
    // console.log(uid)
    // return 0
    return getters.getUserCart(uid).reduce((total, product) => {
      // console.log(product.id)
      // console.log(total)
      // console.log(product.price)
      // console.log(product.quantity)
      return total + product.price * product.quantity
    }, 0)
  },
  // getUsercartTotal: (state, getters) => {
  //   return getters.cartProducts.reduce((total, product) => {
  //     return total + product.price * product.quantity
  //   }, 0)
  // },

  cartProducts: (state, getters, rootState) => {
    return state.cartItems.map(
      // ({ id, quantity, price, bikeType, tourDate, timeZone }) => {
      (item) => {
        const cartData = rootState.sleepProducts.find((product) => {
          return product.id === item.id
        })
        const productTotal = item.quantity * cartData.price
        // console.log('id' + item.id)
        // console.log('quantity' + item.quantity)
        // console.log('price' + item.price)
        // console.log('bikeType' + item.bikeType)
        // console.log(item)
        return {
          id: cartData.id,
          title: cartData.title,
          subTitle: cartData.subTitle,
          price: cartData.price,
          inventory: cartData.inventory,
          // img: cartData.img,
          quantity: item.quantity,
          bikeType: item.bikeType,
          tourDate: item.tourDate,
          timeZone: item.timeZone,
          orderKey: item.orderKey,
          productTotal: productTotal,
          loginUid: item.loginUid
        }
      }
    )
  },
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  },
  cartTotalQuantity: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.quantity
    }, 0)
  }
}

export const actions = {
  checkout({ commit, state }, cartItems) {
    // console.info('action checkout start----------')
    alert('checkout')
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
    // console.log('addProductToCartAction')
    // console.log(product)
    commit('setCheckoutStatus', null)
    if (product.inventory >= product.quantity) {
      const cartItem = state.cartItems.find((item) => {
        return (
          item.id === product.id &&
          item.tourDate.code === product.tourDate.code &&
          item.timeZone.code === product.timeZone.code &&
          item.loginUid === product.loginUid
        )
      })
      if (!cartItem) {
        // console.log('create cart item')
        commit('pushProductToCart', {
          id: product.id,
          title: product.title,
          subTitle: product.subTitle,
          price: product.price,
          inventory: product.inventory,
          // img: product.img,
          quantity: product.quantity,
          bikeType: product.bikeType,
          tourDate: product.tourDate,
          timeZone: product.timeZone,
          loginUid: product.loginUid,
          // order: 1111,
          orderKey:
            product.id +
            '-' +
            product.tourDate.date +
            '-' +
            product.timeZone.zone +
            '-' +
            product.loginUid
        })
      } else {
        // commit('incrementItemQuantity', product)
        const userKey = {
          id: product.id,
          tourDateCode: product.tourDate.code,
          timeZoneCode: product.timeZone.code,
          loginUid: product.loginUid,
          quantity: product.quantity
        }
        commit('incrementUserCartQuantity', userKey)
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
    // console.log('removeId' + removeId.id)
    // console.log('removekey' + removeId.key)
    commit('removeProductToCart', removeId.key)
  },
  removeUserCart({ state, commit }, removeItem) {
    const cartIndex = state.cartItems.findIndex((item) => {
      // console.log(item.loginUid)
      // console.log(item.id)
      // console.log(item.orderKey)
      // console.log(removeItem.loginUid)
      // console.log(removeItem.id)
      // console.log(removeItem.orderKey)
      return (
        item.loginUid === removeItem.loginUid &&
        item.id === removeItem.id &&
        item.orderKey === removeItem.orderKey
      )
    })
    // console.log(cartIndex)
    if (cartIndex === -1) {
      console.log('nothing remove itrms')
    } else {
      commit('removeProductToCart', cartIndex)
    }
  },
  // solution
  removeProductCart({ state, commit }, removeItem) {
    const cartIndex = state.cartItems.findIndex((item) => {
      return (
        item.loginUid === removeItem.loginUid &&
        item.id === removeItem.id &&
        item.tourDate.code === removeItem.tourDate.code &&
        item.timeZone.code === removeItem.timeZone.code
      )
    })
    // console.log(cartIndex)
    if (cartIndex === -1) {
      console.log('nothing remove item')
    } else {
      commit('removeProductToCart', cartIndex)
    }
  },
  updateProductCart({ state, commit }, updateItem) {
    // console.log('updateProductCart')
    // console.log(updateItem)
    const cartIndex = state.cartItems.findIndex((item) => {
      return (
        item.loginUid === updateItem.loginUid &&
        item.id === updateItem.id &&
        item.tourDate.code === updateItem.tourDate.code &&
        item.timeZone.code === updateItem.timeZone.code
      )
    })
    if (cartIndex === -1) {
      console.log('nothing update item')
    } else {
      const updateData = {
        item: updateItem,
        key: cartIndex
      }
      commit('updateProductToCart', updateData)
    }
  }
}
