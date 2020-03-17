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
  SENDGRID
} from './actionTypes'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import axios from 'axios'

const db = firebase.database()

export const state = () => ({
  page: 'home',
  items: [],
  user: null,
  reloadkey: 0,
  regstar: [],
  authErrors: [],
  addTodoErrors: [],
  message: [],
  resetMessage: [],
  doneInsta: false,
  // userProf: {
  //   name: '',
  //   email: '',
  //   photoUrl: '',
  //   emailVerified: '',
  //   uid: '',
  //   pass: ''
  // },
  singInFinish: true
  // isAuthError: false
})
export const mutations = {
  pagePathSet(state, payload) {
    state.page = payload
  },
  setUser(state, payload) {
    state.user = payload
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
  // firebase
  ...vuexfireMutations
}

export const actions = {
  // setUser({ commit }, payload) {
  //   commit('setUser', payload)
  // },

  [SENDGRID]: async (context, msg) => {
    // const msg = {
    //   to: 'hiramatsu3300@gmail.com',
    //   from: this.emai,
    //   subject: 'CONTACT',
    //   text: mailMessage,
    //   name: this.firstName,
    //   phone: this.phone
    // }

    // const api = 'https://api.coingecko.com/api/v3/coins/list'
    // ローカルのドメイン取得
    const baseUrl = `${location.protocol}//${location.host}`
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
      })
      .catch((err) => {
        context.commit('setMessage', 'メールを送信できませんでした。')
        context.commit('setMessage', `エラーコード：${err.response.status}`)
        console.info('axiou post error')
        console.log(err)
      })
  },
  [ADD_REGISTORY]: firebaseAction(async (context, user) => {
    // console.log('dispatch ADD_REGISTORY')
    // console.log('disp uid: ' + user.uid)
    // console.log('disp email: ' + user.email)
    // console.log('disp name: ' + user.displayName)
    await db
      .ref('todoUser')
      .child(user.uid)
      .push(user)
  }),
  [GET_REGISTORY]: firebaseAction(({ bindFirebaseRef }, user) => {
    // console.log('GET_REGISTORY uid: ' + user.uid)
    // console.log('GET_REGISTORY emai: ' + user.email)
    // console.log('GET_REGISTORY displayName: ' + user.displayName)
    bindFirebaseRef('regstar', db.ref('todoUser/' + user.uid), {
      wait: true
    })
  }),
  [UPDATEDANE_REGISTORY]: firebaseAction(async (context, user) => {
    // console.log('UPDATEDANE_REGISTORY')
    // console.log('UPDATEDANE_REGISTORY key:' + user.key)
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
    // console.log('UPDATEDANE_REGISTORY')
    // console.log('UPDATEDANE_REGISTORY key:' + user.key)
    await db
      .ref('todoUser/' + user.uid)
      .child(user.key)
      .remove()
  }),
  [INIT_TODO]: firebaseAction(({ bindFirebaseRef }, user) => {
    // console.log('INIT_TODO uid: ' + user)
    bindFirebaseRef('items', db.ref('imgdatas').child(user), {
      wait: true
    })
  }),
  [ADD_TODO]: firebaseAction(async (context, insdata) => {
    // console.log('ADD_TODO firebase push')
    await db.ref('imgdatas/' + insdata.user).push(insdata)
    // console.log('ADD_TODO setMessage')
    await context.commit('setMessage', '追加しました。')
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
    // console.log('EDIT_TODO')
    // console.log('user: ' + keydata.user)
    // console.log('key: ' + keydata.key)
    // console.log('title: ' + keydata.title)

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
  // [INIT_TODO]: firebaseAction(({ bindFirebaseRef }) => {
  //   bindFirebaseRef('items', db.ref('imgdatas'), { wait: true })
  // }),
  // [ADD_TODO]: firebaseAction((context, text) => {
  //   db.ref('imgdatas').push(text)
  // }),
  // [REMOVE_TODO]: firebaseAction((context, key) => {
  //   db.ref('imgdatas')
  //     .child(key)
  //     .remove()
  // }),
  // [UPDATEDANE_TODO]: firebaseAction((context, key) => {
  //   db.ref('imgdatas')
  //     .child(key)
  //     .update({ done: true })
  // }),

  [CREATE_MYPHOTO]: async (context, createDatas) => {
    console.log('CREATE_MYPHOTO start')
    // firebase
    // key: item['.key'],
    // shootDate: '2019-07-20',
    // done: true,
    // title: item.title,
    // insUrl: item.insUrl,
    // insDaneUrl: this.insDaneUrl,
    // filename: this.filename,
    // imageUrl: '',
    // // strage
    // stargeImage: this.imageUrl
    const imgDatas = {
      shootDate: createDatas.shootDate,
      done: createDatas.done,
      title: createDatas.title,
      filename: createDatas.filename,
      insUrl: createDatas.insUrl,
      insDaneUrl: createDatas.insDaneUrl,
      imageUrl: ''
    }
    // console.log(imgDatas.insDaneUrl)
    // console.log(imgDatas.filename)
    // console.log(imgDatas.image)
    // firebase strage rule
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read, write;
    //     }
    //   }
    // }
    const filename = createDatas.filename
    // alert(filename)
    // alert(createDatas.stargeImage)
    // alert(imgDatas.title)
    console.log('CREATE_MYPHOTO strage upload')
    await firebase
      .storage()
      .ref('images/' + filename)
      .put(createDatas.stargeImage)
      .then((fileData) => {
        console.log('CREATE_MYPHOTO strage getURL')
        return firebase
          .storage()
          .ref('images/' + filename)
          .getDownloadURL()
      })
      .then((url) => {
        console.log('CREATE_MYPHOTO database update')
        imgDatas.imageUrl = url
        // const updates = {}
        // updates['imgdatas/' + createDatas.key] = imgDatas
        // db.ref().update(updates)
        // db.ref('imgdatas')
        //   .child(createDatas.key)
        //   .update(imgDatas)
        db.ref('imgdatas/' + createDatas.user)
          .child(createDatas.key)
          .update(imgDatas)
        // context.commit('setMessage', 'インスタを追加しました。')
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
  }

  // getEmail(state) {
  //   for (const key in state.regstar) {
  //     return state.regstar[key].email
  //   }
  // }
  // getRegistration(state) {
  //   for (const key in state.regstar) {
  //     // console.log(key + ' : ' + state.regstar[key].uid)
  //     // console.log(state.regstar[key].uid)
  //     // console.log(state.regstar[key].email)
  //     // console.log(state.regstar[key].displayName)
  //     // console.log(state.regstar[key].registration)
  //     return state.regstar[key].registration
  //   }
  // for (const key in rest) {
  //   console.log(key + ' : ' + rest[key].uid)
  //   console.log(rest[key].uid)
  //   console.log(rest[key].email)
  //   console.log(rest[key].displayName)
  //   console.log(rest[key].registration)
  //   return rest[key].registration
  // }
  // console.log(state.regstar)
  // Object.keys(state.regstar).forEach((key) => {
  //   console.log(key + 'は' + state.regstar[key] + 'と鳴いた！')
  //   return key
  // })
  // }
}
