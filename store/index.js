import jsonData from '@/assets/json/sleepProducts.json'
import firebase from '@/plugins/firebase'
import {
  ADD_TODO,
  REMOVE_TODO,
  INIT_TODO,
  UPDATEDANE_TODO,
  CREATE_MYPHOTO,
  ADD_REGISTORY,
  GET_REGISTORY,
  UPDATEDANE_REGISTORY,
  REMOVE_REGISTORY,
  EDIT_TODO,
  SENDGRID,
  CLOUD_FUNCTION,
  SLEEP_DATA_CREATE,
  GET_SLEEP_DATA,
  SET_SLEEP_IMG_URL,
  SLEEP_ADD_REVIEW,
  SLEEP_GET_REVIEW,
  SLEEP_QUESTIONS_CREATE,
  GET_QUESTION_DATA,
  SLEEP_GET_SOLUTION,
  SLEEP_ADD_SOLUTION
} from './actionTypes'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import axios from 'axios'

const db = firebase.database()

export const state = () => ({
  page: 'home',
  uid: null,
  items: [],
  user: null,
  reloadkey: 0,
  regstar: [],
  authErrors: [],
  addTodoErrors: [],
  message: [],
  resetMessage: [],
  doneInsta: false,
  singInFinish: true,

  sleepData: jsonData, // assets json create sleep products
  sleepProducts: [], // sllep Products
  sleepProductsImgUrl: [],
  sleepreviews: [], // sllep review
  sleepQuestions: [], // sllep Questions
  sleepSelectedQuestions: [], // sllep Questions of Page
  sleepSolutions: [], // sllep Questions of Page
  msg: 'hellow strage'
})
export const mutations = {
  setLoginUid(state, payload) {
    state.uid = payload
  },
  setMsg(state, payload) {
    state.msg = payload
  },
  resetImgUrl(state) {
    state.sleepProductsImgUrl = []
  },
  addImgUrl(state, payload) {
    state.sleepProductsImgUrl.push(payload)
  },
  pagePathSet(state, payload) {
    state.page = payload
  },
  setUser(state, payload) {
    state.user = payload
    console.log('userSet: ' + state.user.uid)
  },
  // no use
  setReloadkey(state, payload) {
    state.reloadkey += 1
  },
  setAuthError(state, payload) {
    state.authErrors.push(payload)
  },
  clearAuthError(state) {
    state.authErrors = []
  },
  setAddTodoError(state, payload) {
    state.addTodoErrors.push(payload)
  },
  clearAddTodoError(state) {
    state.addTodoErrors = []
  },

  setMessage(state, payload) {
    state.message.push(payload)
  },
  clearMessage(state) {
    state.message = []
  },
  setResetMessage(state, payload) {
    state.resetMessage.push(payload)
  },
  clearResetMessage(state) {
    state.resetMessage = []
  },
  setDoneInsta(state) {
    state.doneInsta = !state.doneInsta
  },
  openDoneInsta(state) {
    state.doneInsta = true
  },
  // setUserProf(state, payload) {
  //   state.userProf = payload
  // },
  setUserProfsignInFinish(state, payload) {
    state.singInFinish = payload
  },
  setSignInFinish(state, payload) {
    state.singInFinish = payload
  },
  // decrementProductInventory(state, { id }) {
  //   const product = state.sleepProducts.find((product) => {
  //     return product.id === id
  //   })
  //   product.inventory--
  // },
  // addProductInventory(state, { id }) {
  //   const product = state.sleepProducts.find((product) => {
  //     return product.id === id
  //   })
  //   product.inventory++
  // },
  // firebase
  ...vuexfireMutations
}

export const actions = {
  [SET_SLEEP_IMG_URL]: async (context) => {
    context.commit('resetImgUrl')
    await context.state.sleepProducts.map((products) => {
      firebase
        .storage()
        .ref()
        .child(`sleep/${products.imgName}`)
        .getDownloadURL()
        .then((url) => {
          context.commit('addImgUrl', {
            id: products.id,
            imgName: products.imgName,
            imgUrl: url
          })
        })
        .catch((err) => {
          console.log('firebase strage getDownloadURL error: ' + err)
        })
    })
  },
  [SLEEP_ADD_REVIEW]: firebaseAction(async (context, msg) => {
    const id = db.ref('sleepreviews').push().key
    const message = {
      productId: msg.productId,
      name: msg.name,
      email: msg.email,
      rait: msg.rait,
      title: msg.title,
      review: msg.review,
      date: msg.date,
      id: id
    }
    await db
      .ref('sleepreviews')
      .push(message)
      .then(() => {
        context.commit('setMessage', 'ありがとうございます。')
        context.commit('setMessage', 'レビューを送信しました。')
      })
      .catch((err) => {
        console.log('error' + err)
        context.commit('setMessage', 'エラーが発生しました。')
      })
  }),
  [SLEEP_GET_REVIEW]: firebaseAction(async ({ bindFirebaseRef }) => {
    await bindFirebaseRef('sleepreviews', db.ref('sleepreviews/'), {
      wait: true
    })
  }),
  // firebase data create -----------------------------------------
  [SLEEP_DATA_CREATE]: firebaseAction(async (context, sleep) => {
    await sleep.map((product) => {
      db.ref('sleepProducts').push(product)
    })
  }),
  // firebase data create -----------------------------------------
  [SLEEP_QUESTIONS_CREATE]: firebaseAction(async (context, questions) => {
    await questions.map((question) => {
      db.ref('sleepQuestions').push(question)
    })
  }),
  [GET_SLEEP_DATA]: firebaseAction(async ({ bindFirebaseRef }) => {
    await bindFirebaseRef('sleepProducts', db.ref('sleepProducts/'), {
      wait: true
    })
  }),
  [GET_QUESTION_DATA]: firebaseAction(async ({ bindFirebaseRef }) => {
    await bindFirebaseRef('sleepQuestions', db.ref('sleepQuestions/'), {
      wait: true
    })
  }),
  // firebase solution ---------------------------------------------------
  [SLEEP_ADD_SOLUTION]: firebaseAction(async (context, solutions) => {
    // console.log('sleep add solution')
    console.log(solutions)
    await db
      .ref('sleepSolutions')
      .child(solutions.uid)
      .update(solutions)
      .then(() => {
        // console.log('ok')
        context.commit('setMessage', 'ありがとうございます。')
        context.commit('setMessage', 'ソリューションを作成しました。')
      })
      .catch((err) => {
        console.log('error' + err)
        context.commit('setMessage', 'エラーが発生しました。')
      })
  }),
  // [SLEEP_GET_SOLUTION]: firebaseAction(async ({ bindFirebaseRef }, uid) => {
  //   console.log('SLEEP_GET_SOLUTION: ' + uid)
  //   await bindFirebaseRef('sleepSolutions', db.ref('sleepSolutions/' + uid), {
  //     wait: true
  //   })
  // }),
  [SLEEP_GET_SOLUTION]: firebaseAction(async ({ bindFirebaseRef }) => {
    await bindFirebaseRef('sleepSolutions', db.ref('sleepSolutions/'), {
      wait: true
    })
  }),
  // fsendmail ---------------------------------------------------
  [SENDGRID]: async (context, msg) => {
    const baseUrl = `${location.protocol}//${location.host}` // ローカルのドメイン取得
    await axios
      .post(`${baseUrl}/api/sendmail`, {
        to: msg.to,
        from: msg.from,
        name: msg.name,
        subject: msg.subject,
        text: msg.text,
        phone: msg.phone
      })
      .then((response) => {
        context.commit('setMessage', 'ありがとうございます。')
        context.commit('setMessage', 'メールを送信しました。')
        console.log(response)
      })
      .catch((err) => {
        context.commit('setMessage', 'メールを送信できませんでした。')
        context.commit('setMessage', `エラーコード：${err.response.status}`)
        console.info('axiou post error')
        console.log(err)
      })
  },
  [CLOUD_FUNCTION]: async (context, msg) => {
    // google cloud function trriger
    const baseUrl = `${location.protocol}//${location.host}` // ローカルのドメイン取得
    await axios
      .post(
        `${baseUrl}/function`, // 'https://us-central1-nuxt-univ-create-gae-todo.cloudfunctions.net/sendgrid '
        {
          to: msg.to,
          from: msg.from,
          name: msg.name,
          subject: msg.subject,
          text: msg.text,
          phone: msg.phone
        }
      )
      .then((response) => {
        context.commit('setMessage', 'ありがとうございます。')
        context.commit('setMessage', 'メールを送信しました。')
        console.info('send mail cloud function ok')
        console.log(response)
      })
      .catch((err) => {
        context.commit('setMessage', 'メールを送信できませんでした。')
        context.commit('setMessage', `エラーコード：${err.response.status}`)
        console.info('axiou post error cloud function no good ')
        console.log(err)
      })
  },
  [ADD_REGISTORY]: firebaseAction(async (context, user) => {
    await db
      .ref('todoUser')
      .child(user.uid)
      .push(user)
  }),
  [GET_REGISTORY]: firebaseAction(async ({ bindFirebaseRef }, user) => {
    await bindFirebaseRef('regstar', db.ref('todoUser/' + user.uid), {
      wait: true
    })
  }),
  [UPDATEDANE_REGISTORY]: firebaseAction(async (context, user) => {
    await db
      .ref('todoUser/' + user.uid)
      .child(user.key)
      .update({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        registration: user.registration
      })
  }),
  [REMOVE_REGISTORY]: firebaseAction(async (context, user) => {
    // console.log('UPDATEDANE_REGISTORY key:' + user.key)
    await db
      .ref('todoUser/' + user.uid)
      .child(user.key)
      .remove()
  }),
  [INIT_TODO]: firebaseAction(async ({ bindFirebaseRef }, user) => {
    await bindFirebaseRef('items', db.ref('imgdatas').child(user), {
      wait: true
    })
  }),
  [ADD_TODO]: firebaseAction(async (context, insdata) => {
    await db.ref('imgdatas/' + insdata.user).push(insdata)
    context.commit('setMessage', '追加しました。')
  }),
  [REMOVE_TODO]: firebaseAction(async (context, keydata) => {
    await db
      .ref('imgdatas/' + keydata.user)
      .child(keydata.key)
      .remove()
  }),

  [UPDATEDANE_TODO]: firebaseAction(async (context, keydata) => {
    await db
      .ref('imgdatas/' + keydata.user)
      .child(keydata.key)
      .update({ done: true })
  }),
  [EDIT_TODO]: firebaseAction(async (context, keydata) => {
    await db
      .ref('imgdatas/' + keydata.user)
      .child(keydata.key)
      .update({ title: keydata.title })
      .then((res) => {
        console.log('firebase update: ' + res)
      })
      .catch((err) => {
        console.log('firebase error code: ' + err)
      })
  }),

  [CREATE_MYPHOTO]: async (context, createDatas) => {
    const imgDatas = {
      shootDate: createDatas.shootDate,
      done: createDatas.done,
      title: createDatas.title,
      filename: createDatas.filename,
      insUrl: createDatas.insUrl,
      insDaneUrl: createDatas.insDaneUrl,
      imageUrl: ''
    }

    const filename = createDatas.filename

    await firebase
      .storage()
      .ref('images/' + filename)
      .put(createDatas.stargeImage)
      .then((fileData) => {
        return firebase
          .storage()
          .ref('images/' + filename)
          .getDownloadURL()
      })
      .then((url) => {
        imgDatas.imageUrl = url
        db.ref('imgdatas/' + createDatas.user)
          .child(createDatas.key)
          .update(imgDatas)
      })
      .catch((err) => {
        console.log('firebase error code: ' + err)
      })
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  getDisplayName(state) {
    for (const key in state.regstar) {
      return state.regstar[key].displayName
    }
  },
  getRegistration(state) {
    for (const key in state.regstar) {
      return state.regstar[key].registration
    }
  },
  getProductsImgUrl: (state, getters, rootState) => (id) => {
    const url = state.sleepProductsImgUrl.find((img) => {
      return img.id === Number(id)
    })
    if (url) {
      return url.imgUrl
    } else {
      return ''
    }
  }

  // console.log(state.regstar)
  // Object.keys(state.regstar).forEach((key) => {
  //   console.log(key + 'は' + state.regstar[key] + 'と鳴いた！')
  //   return key
  // })
  // }
}
