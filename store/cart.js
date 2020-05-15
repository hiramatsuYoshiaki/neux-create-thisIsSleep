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
    console.log('pushProductToCart state ')
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
    console.log('update product to cart----------')

    console.log(updateData.item.id)
    console.log(updateData.item.tourDate.date)
    console.log(updateData.item.timeZone.zone)
    console.log(updateData.item.bikeType.type)
    console.log(updateData.key)
    state.cartItems.splice(updateData.key, 1, updateData.item)
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
    console.log('cartProducts')
    return state.cartItems.map(
      // ({ id, quantity, price, bikeType, tourDate, timeZone }) => {
      (item) => {
        const cartData = rootState.sleepProducts.find((product) => {
          // return product.id === id
          return product.id === item.id
        })
        // const productTotal = quantity * cartData.price
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
          img: cartData.img,
          quantity: item.quantity,
          bikeType: item.bikeType,
          tourDate: item.tourDate,
          timeZone: item.timeZone,
          orderKey: item.orderKey,
          productTotal: productTotal
        }
      }
    )
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
    console.log('addProductToCartAction')
    console.log(product)
    commit('setCheckoutStatus', null)
    if (product.inventory >= product.quantity) {
      const cartItem = state.cartItems.find((item) => {
        return (
          item.id === product.id &&
          item.tourDate.code === product.tourDate.code &&
          item.timeZone.code === product.timeZone.code
        )
      })
      if (!cartItem) {
        console.log('create cart item')
        commit('pushProductToCart', {
          id: product.id,
          title: product.title,
          subTitle: product.subTitle,
          price: product.price,
          inventory: product.inventory,
          img: product.img,
          quantity: product.quantity,
          bikeType: product.bikeType,
          tourDate: product.tourDate,
          timeZone: product.timeZone,
          order: 1111,
          orderKey:
            product.id +
            '-' +
            product.tourDate.date +
            '-' +
            product.timeZone.zone
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
    // console.log('removeId' + removeId.id)
    // console.log('removekey' + removeId.key)
    commit('removeProductToCart', removeId.key)
  },
  // solution
  removeProductCart({ state, commit }, removeItem) {
    const cartIndex = state.cartItems.findIndex((item) => {
      return (
        item.id === removeItem.id &&
        item.tourDate.code === removeItem.tourDate.code &&
        item.timeZone.code === removeItem.timeZone.code
      )
    })
    console.log(cartIndex)
    if (cartIndex === -1) {
      console.log('nothing remove item')
    } else {
      commit('removeProductToCart', cartIndex)
    }
  },
  updateProductCart({ state, commit }, updateItem) {
    console.log('updateProductCart')
    console.log(updateItem)
    const cartIndex = state.cartItems.findIndex((item) => {
      return (
        item.id === updateItem.id &&
        item.tourDate.code === updateItem.tourDate.code &&
        item.timeZone.code === updateItem.timeZone.code
      )
    })
    console.log(cartIndex)
    if (cartIndex === -1) {
      console.log('nothing update item')
    } else {
      const updateData = {
        item: updateItem,
        key: cartIndex
      }
      // commit('updateProductToCart', cartIndex)
      commit('updateProductToCart', updateData)
    }
  }
}
