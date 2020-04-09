# nuxt-create-thisIsSleep

nuxt-create-thisIsSleep-new

clone
github repository: nuxt-univ-gae-todo2

host  
gcp project nama: nuxt-univ-create-gae-sendgird
gcp project id : nuxt-univ-create-gae-todo
url: https://nuxt-univ-create-gae-todo.appspot.com/

### アプリケーションの概要

Todos アプリケーション
Vue.js のフレームワーク Nuxt.js
firebase Auth で認証する(email password)
firebase database にユーザー情報を記録
sendgrid を使いメール送信
Canvas 使用

### セットアップ

```
$ npx create-nuxt-app <project-name>

create-nuxt-app v2.8.0
Generating Nuxt.js project in  D:\develop-github\nuxt\create-nuxt-univ\nuxt-univ-create-gae-hosting\nuxt-univ-gae-app
? Project name nuxt-univ-gae-app
? Project description My spectacular Nuxt.js project
? Author name hiramatsu
? Choose the package manager Npm
? Choose UI framework None
? Choose custom server framework None (Recommended)
? Choose Nuxt.js modules Axios
? Choose linting tools ESLint, Prettier
? Choose test framework None
? Choose rendering mode Universal (SSR)
```

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

# buefy (css framework) install

1. nuxt-buefy パッケージをインストール

```bash
$ npm i nuxt-buefy
```

2. パッケージを読み込む  
   `nuxt.config.js`

```
export default {
  modules: [
    'nuxt-buefy'
  ],
  buefy: {
    css: false,
    materialDesignIcons: false
  },
}
```

# Google Cloud Platform へのデプロイ

## app.yaml 設置

ユニバーサル Nuxt アプリケーションを App Engine にデプロイするために追加する必要があるのは、app.yaml というファイルだけです。ルートプロジェクトディレクトリにその名前の新しいファイルを作成し、次の内容を追加します:

```
runtime: nodejs10

instance_class: F1

handlers:
  - url: /_nuxt
    static_dir: .nuxt/dist/client
    secure: always

  - url: /(.*\.(gif|png|jpg|ico|txt))$
    static_files: static/\1
    upload: static/.*\.(gif|png|jpg|ico|txt)$
    secure: always

  - url: /.*
    script: auto
    secure: always

env_variables:
  HOST: '0.0.0.0'
  NODE_ENV: 'production'

```

## App Engine

1.  GCP のコンソールから新しいプロジェクトを作成する。

```
プロジェクト名: nuxt-univ-gae-app
```

2.  リージョンの選択する。

```
リージョンを選択してください。: asia-northeast1
```

3.  使用言語を選択する。

```
node.js
```

4.  Cloud SDK を初期化する。

```
 $ gcloud init


Welcome! This command will take you through the configuration of gcloud.

Settings from your current configuration [default] are:
core:
  account: hiramatsu3300@gmail.com
  disable_usage_reporting: 'False'

Pick configuration to use:
 [1] Re-initialize this configuration [default] with new settings
 [2] Create a new configuration
Please enter your numeric choice:  1

Your current configuration has been set to: [default]

You can skip diagnostics next time by using the following flag:
  gcloud init --skip-diagnostics

Network diagnostic detects and fixes local network connection issues.
Checking network connection...done.
Reachability Check passed.
Network diagnostic passed (1/1 checks passed).

Choose the account you would like to use to perform operations for
this configuration:
 [1] hiramatsu3300@gmail.com
 [2] Log in with a new account
Please enter your numeric choice:  1

You are logged in as: [hiramatsu3300@gmail.com].

Pick cloud project to use:
 [1] angular2todo1
 [2] crafty-centaur-245706
 [3] gallery-a89f1
 [4] linear-reason-139903
 [5] midyear-respect-156706
 [6] myapp-8d883
 [7] mychat-ed85a
 [8] mytest-f1d0d
 [9] mytodo-26418
 [10] ng-auth-master
 [11] nuxt-app-6f771
 [12] nuxt-app2
 [13] nuxt-app3
 [14] nuxt-univ-gae-app
 [15] nuxt-univ-gae-hosting
 [16] oauth2-d0bf7
 [17] oauth3-11020
 [18] oauth4-9b520
 [19] Create a new project
Please enter numeric choice or text value (must exactly match list
item):  14

Your current project has been set to: [nuxt-univ-gae-app].

Not setting default zone/region (this feature makes it easier to use
[gcloud compute] by setting an appropriate default value for the
--zone and --region flag).
See https://cloud.google.com/compute/docs/gcloud-compute section on how to set
default compute region and zone manually. If you would like [gcloud init] to be
able to do this for you the next time you run it, make sure the
Compute Engine API is enabled for your project on the
https://console.developers.google.com/apis page.

Created a default .boto configuration file at [C:\Users\Owner\.boto]. See this file and
[https://cloud.google.com/storage/docs/gsutil/commands/config] for more
information about configuring Google Cloud Storage.
Your Google Cloud SDK is configured and ready to use!

* Commands that require authentication will use hiramatsu3300@gmail.com by default
* Commands will reference project `nuxt-univ-gae-app` by default
Run `gcloud help config` to learn how to change individual settings

This gcloud configuration is called [default]. You can create additional configurations if you work with multiple accounts and/or projects.
Run `gcloud topic configurations` to learn more.

Some things to try next:

* Run `gcloud --help` to see the Cloud Platform services you can interact with. And run `gcloud help COMMAND` to get help on any gcloud command.
* Run `gcloud topic --help` to learn about advanced features of the SDK like arg files and output formatting
```

5. ビルドする。

```
$ npm run build
```

6. デプロイする。

```
 $ gcloud app deploy


Services to deploy:

descriptor:      [D:\develop-github\nuxt\create-nuxt-univ\nuxt-univ-create-gae-hosting\nuxt-univ-gae-app\app.yaml]
source:          [D:\develop-github\nuxt\create-nuxt-univ\nuxt-univ-create-gae-hosting\nuxt-univ-gae-app]
target project:  [nuxt-univ-gae-app]
target service:  [default]
target version:  [20190705t124603]
target url:      [https://nuxt-univ-gae-app.appspot.com]


Do you want to continue (Y/n)?  y

Beginning deployment of service [default]...
Created .gcloudignore file. See `gcloud topic gcloudignore` for details.
#============================================================#
#= Uploading 53 files to Google Cloud Storage               =#
#============================================================#
File upload done.
Updating service [default]...done.
Setting traffic split for service [default]...done.
Deployed service [default] to [https://nuxt-univ-gae-app.appspot.com]

You can stream logs from the command line by running:
  $ gcloud app logs tail -s default

To view your application in the web browser run:
  $ gcloud app browse
```

7. ブラウザで確認する。

```
$ gcloud app browse
```

8. うまく表示されない場合は、ログを確認する。

```
$ gcloud app logs tail -s default
```

# nuxt.config.js setting

> nuxt.config.js での導入時の設定

# eslint

フォーマットエラー対応
✖ 7 problems (7 errors, 0 warnings)
7 errors, 0 warnings potentially fixable with the `--fix` option.

Solved adding fix option in nuxt.config.jsfile:

```
extend(config, ctx) {
    if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
            enforce : 'pre',
            test    : /\.(js|vue)$/,
            loader  : 'eslint-loader',
            exclude : /(node_modules)/,
            options : {
                fix : true
            }
        });
    }
}
```

ex.https://github.com/nuxt/nuxt.js/issues/1628

```
options: {
fix: true
       }
```

---

# Firebase の設定

# dotenv を使って環境変数を設定し、Firebase の config で使う。

1. dotenv をインストール

```
$ npm i @nuxtjs/dotenv
```

2. nuxt.config.js を編集する
   `nuxt.config.js`

```
export default {
  modules: [
    '@nuxtjs/dotenv'
  ],
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASEURL: process.env.FIREBASE_DATABASEURL,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
  },
}
```

3. .env をルートディレクトリに作りキーを設定する。
   `.env`

```
FIREBASE_API_KEY='<key>'
FIREBASE_AUTH_DOMAIN='oauth3.firebaseapp.com'
FIREBASE_DATABASEURL='https://oauth3.firebaseio.com'
FIREBASE_PROJECTID='oauth3'
FIREBASE_STORAGEBUCKET='oauth3.appspot.com'
```

4. Firebase config に process.env を使って設定をする。
   `plugins/firebase.js`

```
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

export default firebase

```

## firesbase Vuexfire

参考サイト
https://qiita.com/h-orito/items/10119bcd202b596b8b6d
https://qiita.com/wataruoguchi/items/8fdda8e9754658be06be

1. Firebase と VuexFire をインストールする。

```
$ npm install vue firebase vuexfire@next --save
```

2. nuxt.config.js を設定しプラグインを使えるようにする。
   `nuxt.config`

```
export default {
plugins: [
    '~/plugins/firebase'
  ],
}
```

3. Nuxt の pulugin ディレクトリに Firebase.js を作る。
   `plugins/firebase.js`

```
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: '<key>',
  authDomain: 'oauth3.firebaseapp.com',
  databaseURL: 'https://oauth3.firebaseio.com',
  projectId: 'oauth3',
  storageBucket: 'oauth3.appspot.com'
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

export default firebase
```

4. store/actionType.js に追加削除の関数を設定する。
   `store/actionTypes.js`

```
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const INIT_TODO = 'INIT_TODO'
```

5. store/index.js に vuexfire を使うように編集する。
   `store/index.js`

```
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { ADD_TODO, REMOVE_TODO, INIT_TODO } from './actionTypes'

const db = firebase.database()
const itemsRef = db.ref('todos')
console.log('db: ' + itemsRef)

export const state = () => ({
  items: [],
})

export const mutations = {
  ...vuexfireMutations
}

export const actions = {
  [INIT_TODO]: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('items', itemsRef, { wait: true })
  }),
  [ADD_TODO]: firebaseAction((context, text) => {
    itemsRef.push(text)
  }),
  [REMOVE_TODO]: firebaseAction((context, key) => {
    itemsRef.child(key).remove()
  })
}

export const getters = {
  getItems: (state) => {
    return state.items
  }
}

```

6. pages/index で Firebase からデータを表示する。
   `pagese/index.vue`

```
<template>
  <div class="container">
      <section>
        <h2>asyncData</h2>
        <h3><pre>App Datas: {{ jsonAll }}</pre></h3>
      </section>
      <section>
        <h2>firebase</h2>
        <h3><pre>items: {{ items }}</pre></h3>
        <input v-model="todoText" type="text" style="color:black" @keyup.enter="addTodoFirebase">
        <li v-for="item in items" :key="item.key">
          {{ item.title }}
          <button style="color: black" @click="removeTodoFirebase(item['.key'])">
            del
          </button>
        </li>
      </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { ADD_TODO, REMOVE_TODO, INIT_TODO } from '~/store/actionTypes'
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      todoText: ''
    }
  },
  created() {
    this.$store.dispatch(INIT_TODO)
  },
  computed: {
    ...mapState(['items'])
  },
  methods: {
    addTodoFirebase() {
      this.$store.dispatch(ADD_TODO, { title: this.todoText, done: false })
      this.todoText = ''
    },
    removeTodoFirebase(key) {
      this.$store.dispatch(REMOVE_TODO, key)
    },
  }
}
</script>

```

## firebase strage を使う

## auth

https://qiita.com/yusuke-asaoka/items/54dd6c933bb07787cbd1

1. google 認証
   `pages/index.vue`

```
<template>
  <div class="container">
      <section>
        <h3>Google Login</h3>
        <div v-if="isWaiting">
          <p>読み込み中</p>
        </div>
        <div v-else>
          <div v-if="!isLogin">
            <button style="color:black" @click="googleLogin">
              Googleでログイン
            </button>
          </div>
          <div v-else>
            <p>{{ user.email }}でログイン中</p>
            <button style="color:black" @click="logOut">
              ログアウト
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
export default {
  asyncData() {
    return {
      // google login
      isWaiting: true,
      isLogin: false,
      user: [],
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
        console.log('login')
      } else {
        this.isLogin = false
        this.user = []
        console.log('logout')
      }
    })
  },
  methods: {
    google login
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>
```

2. パスワード認証
   `pages/index.vue`

```
<template>
  <div class="container">
        <section>
          <h3>Google Auth mail</h3>
          <div v-if="isWaiting">
            <p>読み込み中</p>
          </div>
          <div v-else>
            <div v-if="!isLogin">
              <div>
                <p>
                  <input
                    v-model="email"
                    style="color:black"
                    type="text"
                    placeholder="email"
                  >
                </p>
                <p>
                  <input
                    v-model="password"
                    style="color:black"
                    type="password"
                    placeholder="password"
                  >
                </p>
                <p>
                  <input
                    id="checkbox"
                    v-model="register"
                    style="color:black"
                    type="checkbox"
                  >
                  <label for="checkbox">新規登録</label>
                </p>
                <button style="color:black" @click="passwordLogin">
                  {{ register ? '新規登録' : 'ログイン' }}
                </button>
                <p>{{ errorMessage }}</p>
              </div>
            </div>
            <div v-else>
              <p>{{ user.email }}でログイン中</p>
              <button style="color:black" @click="logOut">
                ログアウト
              </button>
            </div>
          </div>
        </section>
    </div>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
export default {
  asyncData() {
    return {
      isWaiting: true,
      isLogin: false,
      user: [],
      register: false,
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
        console.log('login')
      } else {
        this.isLogin = false
        this.user = []
        console.log('logout')
      }
    })
  },
  methods: {
    passwordLogin() {
      const email = this.email
      const password = this.password
      if (this.register) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
          const errorMessage = error.message
          this.errorMessage = errorMessage
        }.bind(this))
      } else {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
          const errorMessage = error.message
          this.errorMessage = errorMessage
        }.bind(this))
      }
    },
    logOut() {
      firebase.auth().signOut()
    }
  }
}
</script>
```

# css プロパティ

sass を利用したい場合は node-sass および sass-loader パッケージをインストールしてください。

1. install

```
npm install --save-dev node-sass sass-loader
```

2. nuxt.config 　 setting

```
export default {
  css: [
    // プロジェクト内の SCSS ファイル
    '@/assets/sass/styles.scss'
  ]
}
```

3. component style setting

```
    <style scoped lang="scss">
    </style>
```

# SASS 変数を vue ファイルで使う

import の記述なしで使う。

1. install

```
npm install --save @nuxtjs/style-resources
```

`注意`
--save-dev にすると google app engine へデプロイ時に not found でエラーになる。package.json の devDependencies ではエラー

2. nuxt.config setting

```
modules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    sass: [
      '~/assets/sass/variable.scss',
    ],
  },
```

3. usage

```
<style scoped lang="scss">
//@import "../../../assets/scss/common/data/thema.scss";
.container {
    color: $text-color
}
</style>
```

# autoprefixer の設定をカスタマイズする

Nuxt.js で CSS(Sass) をコンパイルすると、 autoprefixer がベンダープレフィクスを自動で適用してくれます。

1. nuxt.config setting

```
build: {
  postcss: [
    require('autoprefixer')({
      browsers: ['IE 11', 'last 2 versions' ],
      grid: true
    })
  ]
}

```

2. autoprefixer デフォルト設定

```
1%, last 2 versions, Firefox ESR
```

1%:1%以上のシェアがあるブラウザ
last 2 versions:最後の 2 バージョンのブラウザ
Firefox ESR:最新の Firefox ESR 版  
3.対応ブラウザの確認
https://browserl.ist/?q=%3E+1%25%2C+last+2+versions%2C+Firefox+ESR

参考ページ:https://parashuto.com/rriver/tools/using-custom-data-for-autoprefixer

# Google Analytics

1. install

```
npm install --save @nuxtjs/google-analytics
```

2.アナリティクスのトラッキング ID を設定する

```
modules: [
  ['@nuxtjs/google-analytics', { id: 'UA-xxxxx-x' }],
],
```

# Google Serch Colsole

1. Google Serch Colsole からメタタグを取得
2. nuxt.config setting

```
head: {

    meta: [
      { name: "google-site-verification",
        content: "TaWpD9i4R5GSPzJjnTc8--t-g8bbDKbfxQX-e1kgio0" },
    ],
  },
```

# Nuxt.js で静的ファイル生成時にサイトマップも自動生成する方法

npm run generate で静的ウェブサイトを生成

1. install

```
npm install --save @nuxtjs/sitemap
```

2. nuxt.config.js setting

```
modules: [
    '@nuxtjs/sitemap',
  ],
  sitemap: {
    // path: '/sitemaps.xml',//Default: sitemaps.xml
    hostname: 'https://romantic-kare-6d357c.netlify.com/',
    generate: true,
    // exclude: [
    //   '/admin'
    // ],
    routes:[
      "/",
      {
        url: '/works',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: '2017-06-30T13:30:00.000Z'
      },
      "/about",
      "/contact"
    ]
  },
```

各パラメーターについて
path
生成されるサイトマップファイルの名前。
generate オプションで dir を変更していなければ、dist フォルダの中に生成される。

hostname
サイト名。

generate
nuxt generate 時に静的なサイトマップファイルを生成するかの設定。
ここを true にしておかないとサイトマップファイルが生成されないので注意。

exclude
サイトマップに含めたくない RUL を指定できる。
管理者ページなどがある場合に使用する。

routes
サイトマップに含める URL を追加する。
基本的には generate オプションの routes と同じように記述すれば OK
上のコードは API から記事の一覧を取得して、記事毎の URL を routes に追加する例。

---

# markdown

1. markdown-it をインストール

```
$ npm i @nuxtjs/markdownit
```

2. nuxt.config に設定を追記

```
markdownit: {
    preset: 'default'
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight: function (/*str, lang*/) { return ''; },
  },
```

3. $md を使ってパースする場合
オプションのinjected:trueに設定すると、$md という変数が使えます。

```
<template>
  <div v-html="$md.render(model)"></div>
</template>

<script>
export default {
  data() {
    return {
      model: '# Hello World!'
    }
  }
}
</script>
```

4. .md ファイルを使ってパースする場合

```
<template>
  <div v-html="sample"></div>
</template>

<script>
  import sample from '../sample.md'

  export default {
    computed: {
      sample() {
        return sample
      }
    }
  }
</script>
```

ex:https://techblog.scouter.co.jp/entry/2019/01/24/190000

# eslintrc.js

## console.log の使用

`eslintrc.js`

```
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
```

# layouts

> layouts ディレクトリ関連

## カスタムレイアウト

1. layouts ディレクトリに新規レイアウト(layouts/topPage.vue)を作成を作成する。

```
    <template>
    <div class="topPage">
        <HeaderNav />
        <nuxt />
    </div>
    </template>
    <script>
    import HeaderNav from '~/components/header/HeaderNav.vue'
    export default {
    layout: 'topPage',
    components: {
        HeaderNav
    }
    }
    </script>
    <style scoped lang="scss">
    </style>

```

2. ページ (pages/works/index.vue ) で、カスタムレイアウトを使うことを伝えます

```
<script>
export default {
  layout: 'topPage',
}
</script>

```

---

# components

> components ディレクトリ関連

---

# page

> page ディレクトリ関連

## transition プロパティ

1. 特定のページ遷移のトランジション

```
export default {
  transition: 'content'
}
```

```
//コンテンツ全体をスライド
.content-slide-enter-active, .content-slide-leave-active {
    transition: all 1s;
}
.content-slide-enter, .content-slide-leave-to {
    transform: translateX(100vw) ;
}
```

2. すべてのページ遷移のトランジション

```
//アプリケーションのすべてのページでフェードさせるトランジション
 .page-enter-active, .page-leave-active {
     transition: opacity .5s;
 }
 .page-enter, .page-leave-to {
     opacity: 0;
 }

```

## head メソッド

1. 個別のページへの HTML の head タグを設定する

```
<script>
export default {
  data() {
    return {
      pageTitle: 'Works Content'
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        // `hid` は一意の識別子として使用されます。 `vmid` は動作しないので使わないでください。
        { hid: 'description',
          name: 'Works by Nuxt.js',
          content: 'このページは、Vue.jsフレームワークのNuxt.jsを使って作成したWebサイトを紹介しています。' }
      ]
    }
  },
}
</script>
```

---

# store

> store ディレクトリ関連

## モジュールモード

`store/index.js`

```
export const state = () => ({
  page: 'home'
})

export const mutations = {

  pagePathSet(state, payload) {
    state.page = payload
  },
}
```

`pages/works/index.vue`

```
<template>
  <div class="container">
    <div class="content-footer">
      <nav class="links">
        <a class="menu_link" @click="link_commit('/works')">
          WORKS
        </a>
        <a class="menu_link" @click="link_commit('/about')">
          ABOUT
        </a>
        <a class="menu_link" @click="link_commit('/contact')">
          CONTACT
        </a>
      </nav>
    </div>
  </div>
</template>
<script>
  computed: {
    page() {
      return this.$store.state.page
    }
  },
  methods: {
    link_commit(linkPath) {
      this.$store.commit('pagePathSet', linkPath)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
      }, 500)
    }
  }
}
</script>
```

# GitHub

## GitHub リポジトリの作成

1. GitHub ログイン後のトップページから、Repositories の New ボタンをクリックします。
2. Create a new repository の画面に遷移するので、リポジトリ名、ライセンス等を入力。Initialize this repository with a README はチェックせず画面下のほうにある Create repository ボタンをクリックします。

## プロジェクトを GitHub に Push する

1. git add -A
2. git commit -m "first commit"
3. git remote add origin https://github.com/hiramatsuYoshiaki/プロジェクト名
4. git push -u origin master

## 現在のブランチから派生ブランチを作成して GitHub へ Push する。

1. git branch new-branch
2. git checkout new-branch
3. git branch
   - new-branch
     master
4. git add -A
5. git commit -m 'new branch commit'
6. git push --set-upstream origin new-branch
   (もしくは、　 git push -u origin new-branch)

## GitHub リポジトリを clone してローカルプロジェクト作る

1. リモートリポジトリを clone する。

```
    git clone https://github.com/hiramatsuYoshiaki/nuxt-univ-create-gae-hosting.git
```

2. インストールする

```
    npm install
```

3. サーバーを立ち上げて確認

```
   npm run dev
```

4. ローカルサーバーへアクセス

```
   http://localhost:3000/で確認する。
```

## ローカルプロジェクトを GitHub へ push する。

```
1. 現在のブランチを確認する。
   git branch
   * master
```

2. master から新しい branch を作る

```
　　git branch new-branch
```

3. 新しい branch に移動し開発を行う。

```
   git checkout new-branch
```

4. clone したリポジトリから別のリモートリポジトリの URL を変更する場合

```
    git remote -v
    origin  https://github.com/hiramatsuYoshiaki/vue-cli3-unit.git (fetch)
    origin  https://github.com/hiramatsuYoshiaki/vue-cli3-unit.git (push)
    git remote rm originで現在のリモートリポジトリを削除する
    git remote add originで新しいリモートリポジトリを追加する
    git remote add origin https://github.com/hiramatsuYoshiaki/vue-cli3-unit-alprime.git
```

5. コミットして GitHub に push する

```
   git add　-A
   git commit -m "コメント"
   git push -u origin new-branch
```

## local でいままで作業していた branch を削除する

1.これで削除できます。これはしなくてもいいですが、開発が進んでいくと branch が増えて branch 一覧がごちゃごちゃしてくるのでやったほうがいいです。

```
git branch -d new-branch
```

## 他の人の開発分を取り込む

1. master に他の人が追加した分を自分のところに取り込みます。

```
  git pull origin master
```

# vuex-persistedstate を使う

1. インストール
   `$ npm install -S vuex-persistedstate`

2. plugins/persistedstate.js を作る
   `persistedstate.js`
   `import createPersistedState from "vuex-persistedstate";`

export default ({store, isHMR}) => {
// In case of HMR, mutation occurs before nuxReady, so previously saved state
// gets replaced with original state received from server. So, we've to skip HMR.
// Also nuxtReady event fires for HMR as well, which results multiple registration of
// vuex-persistedstate plugin
if (isHMR) return;

if (process.client) {
window.onNuxtReady((nuxt) => {
createPersistedState()(store); // vuex plugins can be connected to store, even after creation
});
}
};

`

3. nuxt.config.js を編集
   `nuxt.config.js`
   `plugins: [ { src: "~plugins/persistedstate.js", ssr: false } ]`

### localStorage で store を永続化する

nuxt.js で再読込しても入力中の内容を保持できる。

### localstorage に保存が可能になるとどうなる

1. 再読込しても、store の状態を保つことができます。
2. 入力中のフォームの内容や、画面の状態を復元することができます。
3. store 中の state は localstorage を消し去らないと新しい値とかを追加しても状態が変わらなくなってしまいます。

### Nuxt の利点である SSR もできるという点とは相性が悪い

SSR 実行時の node には localstorage がありませんから、window.localstorage はさわれません。
そのため、今回のプラグインも{... , ssr; false}として、SSR 時は起動しないようにする必要があります。

# Vue にコンポーネントの再レンダリングを強制する正しい方法

https://michaelnthiessen.com/force-re-render/

# @nuxtjs/date-fns

データフォーマト
https://github.com/nuxt-community/date-fns-module

# Instagram 埋め込みコードの構造を解析してみた

インスタグラムの埋め込みコードを使った、ウェブサイトへの表示
https://qiita.com/h5y1m141@github/items/403dee38e88570185949

# vue カスタムディレクティブを使ってページスクロールしてフェードしながら要素を出したいときなどに使う

参考サイト
https://note.mu/yunp_q/n/n908596ec0806
https://qiita.com/po3rin/items/325ac3718c73cde765d2
Nuxt でカスタムディレクティブに動的引数を渡す。  
https://mogashiro.com/2019/04/23/nuxt%E3%81%A7%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96%E3%81%AE%E5%BC%95%E6%95%B0%E3%81%AB%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF/

### カスタムディレクティブを実装する

1. plugins ディレクトリの中で scroll.js を作成する。
   `plugins/scroll.js`

```
import Vue from 'vue'
Vue.directive('scroll', {
  inserted: (el, binding) => {
    const f = (evt) => {
      const arg = binding.arg ? binding.arg : 0
      if (binding.value(evt, el, arg)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
```

2. nuxt.config.js 内の plugins に作成した ファイルへのパスを追加します。
   `nuxt.config.js`

```
plugins: [
     src: '~plugins/scroll.js', ssr: false
  ],
```

3. v-scroll=""を使えるようにする。
   `components/level/levelOrderComponent,vue`

```
<template lang="pug">
    div.container-fluid
      div.row
        div.levelCard
          cardOrderComponent(v-for="(item, key, index) of items" :key="key")
            template(v-slot:icon)
              div(v-scroll:[item]="scrollHandle" )
                transition(name="fadeInFromUnderLeft")
                    i(:class="item.icon" v-if="item.isShowIcon")
            template(v-slot:title)
                div(v-scroll:[item]="handleScrollTitle")
                  transition(name="fadeInFromUnderRight")
                    div(v-if="item.isShowTitle") {{ item.title }}
            template(v-slot:price) {{ item.subTitle }}
</template>
<script>
import cardOrderComponent from '~/components/cards/cardOrderComponent.vue'
export default {
  components: {
    cardOrderComponent
  },
  props: {
    items: Array
  },
  methods: {
    scrollHandle(evt, el, arg) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.items[arg.id].isShowIcon = true
      } else {
        this.items[arg.id].isShowIcon = false
      }
    },
    handleScrollTitle(evt, el, arg) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.items[arg.id].isShowTitle = true
      } else {
        this.items[arg.id].isShowTitle = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.section-header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h5 {
    font-weight: 600;
  }
  @media (min-width: 976px) {
    padding: 0 5rem;
    height: 10rem;
  }
}
.levelCard {
  width: 100%;
  padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 976px) {
    padding: 0 5rem;
    flex-direction: row;
  }
}
i {
  font-size: 12rem;
  @media (min-width: 976px) {
    font-size: 7rem;
  }
}
</style>
```

ディレクティブの引数
https://jp.vuejs.org/v2/guide/custom-directive.html
ディレクティブの引数は動的にできます。例えば、v-mydirective:[argument]="value" において、argument はコンポーネントインスタンスの data プロパティに基づいて更新されます！これにより、アプリケーション内でのカスタムディレクティブの利用が柔軟になります。

# ソート／フィルターを実装する

参考サイト
Vue で絞り込みとソート機能を実装してみる 01
https://tmykndr.hatenablog.com/entry/2018/09/03/020911
Vue.js 2.x のフィルタについて調べてみた
https://qiita.com/yutaro23/items/095cf66038bb9fabc094

###前置き
フィルタの 3 つの表現方法

1. computed プロパティを使う
2. filters プロパティを使う
3. グローバルに filter を定義する
   ここでは、computed プロパティを使い実装する。

4. computed()を作成する。
   `page/thisIsSleep/buy/buy.vue computed()`
   ポイント 1:computed()のなかでソートしたものを、computed()の中でフィルターする。
   ポイント 2:computed()では直接データを変更できないので、slice(0)を使ってシャドーコピーをして新たに配列を書き出す。

```
computed():{
  sortedData() {
    return this.items.slice(0).sort((a, b) => {
      return a.date < b.featured ? 1 : a.date > b.featured ? -1 : 0
    }
  }
  filterData() {
    return this.sortedData.slice(0).filter((data) => {
      return data.price < 2000
    })
  }
}
```

2. v-for でリスト作成する。

```

div(v-for="(item, index) in filterData.slice(this.filterStart,this.filterEnd) " :key="item.id")

```

# NUXT でカスタムフィルターをグローバルに設定する

参考サイト
文字列のフォーマットに便利な filter 機能を Nuxt.js 環境で使ってみる
https://papadays.com/post/ae8rxzghpvv8nugrepsz3/

1. plugins ディレクトリの中に filter.js を作成する。
   `plugins/filter.js`

```

import Vue from 'vue'
Vue.filter('capitalize', (value) => {
if (!value) return ''
value = value.toString()
return value.charAt(0).toUpperCase() + value.slice(1)
})

```

2. nuxt.config.js で、読み込みます。
   `nuxt.config.js`

```

plugins: [
//filter
{ src: '~/plugins/filter.js', ssr: false }
],

```

3. filter を適用させる
   `page/thisIsSleep/buy/buy.vue`

```

h4 {{title2 | capitalize}}

```

# ソートパターン

1. 昇順

```
  return this.items.slice(0).sort((a, b) => {
    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
  })
```

2. 降順

```
  return this.items.slice(0).sort((a, b) => {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  })
```

3. アルファベット順

```
  return this.items.slice(0).sort((a, b) => {
    const textA = a.title.toUpperCase()
    const textB = b.title.toUpperCase()
    return textA < textB ? -1 : textA > textB ? 1 : 0
  })
```

#　 sendgrid を使ってメールを送信する。

## express install

初期設定で express をインストールしていないので追加する。
npm install --save express

# GAE からサードパーティの SendGrid を使ってメールする

Google Cloud Platform（以下、GCP）環境で,
Google App Engine（以下、GAE）と SendGrid を利用する

### Google Cloud Console を通じて SendGrid Email API プランに登録する

参考：GAE に JSON 取得の Web サーバーを構築して SendGrid からメールするhttps://qiita.com/doki_k/items/c3409167fc33f767e86f

1. GCP にアクセスし、ヘッダーバーで該当プロジェクトを選択（nuxt-create-gac-sendgrid）
2. ナビゲーションバーのナビゲーションメニューをクリックして、Marketplace を選択
3. sendgrid を選択
4. 「無料プランで開始」ボタンをクリック
5. Subscribe 項目で利用プランの選択
6. Activate 項目で SendGrid アカウントの登録
7. 認可画面で、許可をクリック
8. "SendGrid ウェブサイトで API キーを管理する"ボタンをクリック
9. SendGrid ウェブサイトの "Settings" から、"API Keys"タブを開き、"Create API Key" ボタンをクリックする
10. Key が発行されるので文字列をコピー（一度しか表示されない）

### .evn 設定

1. .evn に key を追加
   `SENDGRID_API_KEY='SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
2. nuxt.config.js に key を追加

```
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
  },
```

# Nuxt.js の serverMiddleware を使って、sendgrid(api) でメール送信する

参考：Nuxt.js の serverMiddleware を使って、api を叩https://mabui.org/nuxtjs-servermiddleware-api/
参考：Nuxt に「serverMiddleware」を設定して、API サーバ的な動きをさせてみたhttps://liginc.co.jp/438249
参考：node.js + express で POST を受け取る & POST パラメータを JSON で取得するhttps://qiita.com/ktanaka117/items/596febd96a63ae1431f8
参考：カスタムサーバーミドルウェアhttps://ja.nuxtjs.org/api/configuration-servermiddleware/
参考：[axios] axios の導入と簡単な使い方https://qiita.com/ksh-fthr/items/2daaaf3a15c4c11956e9
参考：Nuxt.js で axios の使い方と設定方法を紹介https://ma-vericks.com/nuxt-axios/

1. フォームボタンより Vuex の dispatch メソッドを使用して、コンポーネントの任意のタイミングで実行
   `pages/thisIsSleep/contact/contact.vue`

```
<template lang="pug">
  div
    form(@submit.prevent="sendMail" novalidate)
        div(v-if="loginErrors.length")
          p.error-title 入力項目を確認してください。
            ul
              li(v-for="(loginError, indexError) in loginErrors" :key="indexError")
                p.error-msg {{ loginError}}
        div.first-name
            label.label
                div.h7 name
            input.input(v-model="firstName" type="text" placeholder="name" required :style="{ background: errorBg.fNameBg }")
        div.email-enter
            label.label
                div.h7 Email
            input.input(v-model="email" type="email" placeholder="Email" required :style="{ background: errorBg.emailBg }")
        div.phone-number
            label.label
                div.h7 phone number
            input.input(v-model="phone" type="text" placeholder="phone" required :style="{ background: errorBg.phoneBg }")
        div.message
            label.label
                div.h7 message
            textarea(v-model="mailMessage" name="textarea" rows="10" cols="50" placeholder="message" required :style="{ background: errorBg.mailMessageBg }")

        button.submit-button(type="submit")
            div
                div.h7 SEND
</template>
<script>
import { mapState } from 'vuex'
import { SENDGRID, CLOUD_FUNCTION } from '~/store/actionTypes'
export default {
  data() {
    return {
      firstName: null,
      email: null,
      phone: null,
      mailMessage: null
    }
  },
  methods: {
    sendMail() {
      const msg = {
        to: 'hiramatsu3300@gmail.com',
        from: this.email,
        subject: 'CONTACT',
        text: this.mailMessage,
        name: this.firstName,
        phone: this.phone
      }
      // sendgrid api からメール送信
      this.$store.dispatch(SENDGRID, sendMsg)
      // google cloud function からメール送信
      //this.$store.dispatch(CLOUD_FUNCTION, sendMsg)
    },
  }
}
</script>
```

2. store Action から axiou で http を使って POST する
   `store/actionType.js`

```
export const SENDGRID = 'SENDGRID'
```

`store/index.js`

```
import { SENDGRID } from './actionTypes'
import axios from 'axios'
export const actions = {
  [SENDGRID]: async (context, msg) => {
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
}
```

3. SendGrid v3 API のメールエンドポイントとの対話専用のサービスパッケージをインストール
   参考：Mail Service for the SendGrid v3 Web API 　https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail
   `npm install --save @sendgrid/mail`

4. API 用のディレクトリ api/ を作成します（ルートの app フォルダーに、index.js を作成します。）

   `app/index.js`

```
require('dotenv').config()
const express = require('express')
const app = express()

// app.post('/', (req, res, next) => {
//   res.send('API root')
// })

//Expressでクライアント経由からデータを会得する場合、Body-Parserをインストールしてreq.body経由でデータを会得するのが一般的でした。
const bodyParser = require('body-parser')
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

//Body-Parserを基にExpressに組み込まれた機能です、クライアントから送信されたデータを、req.body経由で会得、操作できます。
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

//sendgrid API LibrariesのNode.jsを使う（コピペ）
//https://sendgrid.com/docs/for-developers/sending-email/libraries/
app.post('/sendmail', (req, res, next) => {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs

  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  //   const msg = {
  //     to: 'hiramatsu3300@gmail.com',
  //     from: 'hworksdev@gmail.com',
  //     subject: 'Test SendGrid no.2',
  //     text: 'This is a test of the SendGrid app on Node',
  //     html:
  //       '<strong>This is a test2 of the SendGrid app on Node</strong><h1>SendGrid</h1>'
  //   }
  const msg = {
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    text: req.body.text,
    html: `<h3>CONTACT MESSAGE</h3>
        <strong>${req.body.text}</strong>
        <br>
        <p>Name:<span>${req.body.name}<span></p>
        <p>from:<span>${req.body.from}</span><p>
        <p>Phone:<span>${req.body.phone}<span></p>
         `
  }

  sgMail.send(msg).then(() => {}, console.error)

  // リクエストボディを出力
  //   console.log(req)
  // パラメータ名、nameを出力
  //   console.log(req.body.to)

  res.send('SendMail API test2 req: ')
})
// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
```

5. serverMiddleware を設定する
   `nuxt.config.js`

```
serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }],
```

# Nuxt.js から GoogleCloudFunction を使ってメール送信する

参考：Node.js クイックスタートhttps://cloud.google.com/functions/docs/quickstart-nodejs?hl=ja
参考：５分でわかる！Google Cloud Functions の使い方https://blog.apar.jp/web/10611/
参考：Nuxt.js のメソッド内で外部 API を叩くと cors エラーが起きるhttps://qiita.com/naokada/items/394c1d85ad2975ba62f0

## 1.Cloud Console を使用して Node.js Cloud 関数を作成

Node.js クイックスタート(https://cloud.google.com/functions/docs/quickstart-nodejs?hl=ja)に従って作成します。

1. GCP Console のプロジェクト セレクタのページで、GCP プロジェクト[nuxt-create-gac-sendgrid]を選択
2. ナビゲーションバーのナビゲーションメニューをクリックして、[Cloud Function] を選択
3. [関数を作成] をクリックします。
4. 関数に名前(sendgrid)を付けます。
5. [トリガー] フィールドで、[HTTP] を選択します。
6. [ソースコード] フィールドで [インライン エディタ]
7. [ランタイム] プルダウンで、必要な Node.js ランタイム(Node.js 10)を選択します。
8. ページの下部にある [作成] をクリックします。
9. 関数の操作メニューを表示して、[関数をテスト] をクリックします。
10. [出力] 画面にテキスト "Hello World!" が表示されます。

## 2.Cloud Console を使用して Node.js Cloud 関数を編集して sendgrid からメール送信させる。

1. 関数の[名前]をクリックする。
2. ヘッダーバーの[編集]をクリックする。
3. [INDEX.JS]タグを選択して、ソースコードを編集して[ok]ボタンを押す。
   `index.js`

```
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
//require('dotenv').config()
exports.helloWorld = (req, res) => {
  //let message = req.query.message || req.body.message || 'Hello SendGrid!';
  //res.status(200).send(message);
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST')

  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // const msg = {
    //   to: 'hiramatsu3300@gmail.com',
    //   from: 'hworksdev@gmail.com',
    //   subject: 'Test SendGrid GCF',
    //   text: 'This is a test of the SendGrid app on Node by Google Cloud Function',
    //   html:
    //     '<strong>This is a test2 of the SendGrid app on Node by Google Cloud Function</strong><h1>SendGrid X by GCF</h1>'
    //  }
     const msg = {
    	to: req.body.to,
    	from: req.body.from,
    	subject: req.body.subject,
    	text: req.body.text,
    	html: `<h3>MESSAGE GCF</h3>
        	<strong>${req.body.text}</strong>
        	<br>
        	<p>Name:<span>${req.body.name}<span></p>
        	<p>from:<span>${req.body.from}</span><p>
        	<p>Phone:<span>${req.body.phone}<span></p>
         `
  }
  sgMail.send(msg).then(() => {}, console.error)
  res.send('SendMail API GCF test ')

};
```

4. [PACKAGE.JSON]タグを選択して、ソースコードを編集して[ok]ボタンを押す。
   `pakage.json`

```
{
  "name": "sample-http",
  "version": "0.0.1",
  "dependencies": {
    	"@sendgrid/mail": "^6.5.4"
      }

}
```

5. [環境変数]ボタンを押す。
6. [変数を追加]ボタンを押し、名前と値を入力する。

```
  名前:SENDGRID_API_KEY
  値:SG.RpXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

```

名前は、nuxt.config の env で設定した名前
`env: {SENDGRID_API_KEY: process.env.SENDGRID_API_KEY},`
値は、SendGrid ウェブサイトで初期設定時に発行された API キー
`SG.RpXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

7. [デプロイ]ボタンを押し、名前と値を入力する。
8. ヘッダーバーの関数の編集の左の[←]ボタンを押し、前のページに戻る
9. [テスト]タブを押す。
10. トリガーとなるイベントを入力する。

```
 {
     "to":"hiramatsuXXXX@gmail.com",
     "from":"hworksXXX@gmail.com",
     "name":"hworksXXX",
     "subject":"sendgrid gcf test",
     "text":"test google cloud function trriger",
     "phone":"09011112222"
  }
```

11. [関数をテスト] をクリックします。
12. メールを確認します。

## 3.Nuxt.js から GoogleCloudFunction の HTTP 関数を呼び出す。

1. フォームボタンより Vuex の dispatch メソッドを使用して、コンポーネントの任意のタイミングで実行
   `pages/thisIsSleep/contact/contact.vue`

```
<template lang="pug">
  div
    form(@submit.prevent="sendMail" novalidate)
        div(v-if="loginErrors.length")
          p.error-title 入力項目を確認してください。
            ul
              li(v-for="(loginError, indexError) in loginErrors" :key="indexError")
                p.error-msg {{ loginError}}
        div.first-name
            label.label
                div.h7 name
            input.input(v-model="firstName" type="text" placeholder="name" required :style="{ background: errorBg.fNameBg }")
        div.email-enter
            label.label
                div.h7 Email
            input.input(v-model="email" type="email" placeholder="Email" required :style="{ background: errorBg.emailBg }")
        div.phone-number
            label.label
                div.h7 phone number
            input.input(v-model="phone" type="text" placeholder="phone" required :style="{ background: errorBg.phoneBg }")
        div.message
            label.label
                div.h7 message
            textarea(v-model="mailMessage" name="textarea" rows="10" cols="50" placeholder="message" required :style="{ background: errorBg.mailMessageBg }")

        button.submit-button(type="submit")
            div
                div.h7 SEND
</template>
<script>
import { mapState } from 'vuex'
import { SENDGRID, CLOUD_FUNCTION } from '~/store/actionTypes'
export default {
  data() {
    return {
      firstName: null,
      email: null,
      phone: null,
      mailMessage: null
    }
  },
  methods: {
    sendMail() {
      const msg = {
        to: 'hiramatsu3300@gmail.com',
        from: this.email,
        subject: 'CONTACT',
        text: this.mailMessage,
        name: this.firstName,
        phone: this.phone
      }
      // sendgrid api からメール送信
      //this.$store.dispatch(SENDGRID, sendMsg)
      // google cloud function からメール送信
      this.$store.dispatch(CLOUD_FUNCTION, sendMsg)
    },
  }
}
</script>
```

2. store Action から axiou で http を使って POST する
   `store/actionType.js`

```
export const SENDGRID = 'SENDGRID'
```

`store/index.js`

```
import { CLOUD_FUNCTION } from './actionTypes'
import axios from 'axios'
export const actions = {
  [CLOUD_FUNCTION]: async (context, msg) => {
    // ローカルのドメイン取得
    const baseUrl = `${location.protocol}//${location.host}`
    await axios
      .post(`${baseUrl}/function`, // 'https://us-central1-nuxt-univ-create-gae-todo.cloudfunctions.net/sendgrid '
       {
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
}
```

## 4. Nuxt.js のメソッド内で外部 API を叩くと cors エラーが起きるので@nuxtjs/axios にある機能を使用して Proxy を設定する。

1. axios のオプションを有効にし、proxy を設定する。
   `nuxt.config.js`

```
export default {
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/function': {
      target:
        'https://us-central1-nuxt-univ-create-gae-todo.cloudfunctions.net/sendgrid',
      pathRewrite: {
        '^/function': '/'
      }
    }
  plugins: [
    { src: 'plugins/axios.js', ssr: false }
  ],
}
```

proxy は、`axios.post(${baseUrl}/function`に一致させる(任意の名前)。
traget は、GoogleCloudFunction の関数の詳細画面のトリガータブに表示された URL を使う。
`https://us-central1-nuxt-univ-create-gae-todo.cloudfunctions.net/sendgrid`

2. Nuxt.js の pulagin ディレクトリに`axios.js`を作り、編集する。
   `pulugin/axios.js`

```
export default ({ $axios, redirect }) => {
  $axios.setToken('access_token')

  $axios.onResponse((config) => {
    $axios.setHeader('Access-Control-Allow-Origin', '*')
  })
}
```

# Vue.js + webpack で slug から動的に img src を作成する方法

https://qiita.com/rotelstift/items/4717c15d263327a26b34

```
<template lang="pug">
  //- item.imgName: img3614.jpg
  img(:src="imgPass(item.imgName)" alt="product image")
</template>
<script>
export default {
  methods: {
    imgPass(imgName) {
      return require('~/assets/img/' + imgName)
    }
  }
}
</script>

```
