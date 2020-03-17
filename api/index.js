//sendgrid----------------------------------
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
//---test
// const axios = require('axios')

// module.exports = (req, res) => {
//   //   console.log('api')
//   //   const api = req.query.api
//   //   axios.get(`${api}`).then((response) => {
//   //     // レスポンスのデータとステータスを出力
//   //     console.log(response.data)
//   //     console.log(response.status)
//   //   })
// }
// const express = require('express')
// const app = express()

// app.get('/', function(req, res) {
//   res.send('HelloWorld')
// })

// module.exports = {
//   path: '/api/',
//   handler: app
// }

// //---test
// const express = require('express')
// const router = express.Router()

// const app = express()
// router.use((req, res, next) => {
//   console.log('app/index express1')
//   Object.setPrototypeOf(req, app.request)
//   Object.setPrototypeOf(res, app.response)
//   req.res = res
//   res.req = req
//   next()
// })

// router.get('/test/:id', (req, res) => {
//   console.log('app/index express2')
//   console.log('--test get')
//   console.log('--id ', req.params.id)
//   res.status(200).json({ message: `test_id = ${req.params.id}` })
// })

// module.exports = {
//   path: '/api',
//   handler: router
// }
// ;('use strict')

// const express = require('express')
// const bodyParser = require('body-parser')

// // const { SENDGRID_API_KEY } = process.env;
// // const { SENDGRID_SENDER } = process.env;
// const { SENDGRID_API_KEY } = 'CJ7iBR8SRf61AmN8q_Ry4Q'
// const { SENDGRID_SENDER } = 'hiramatsu3300@gmail.com'
// const Sendgrid = require('@sendgrid/client')

// Sendgrid.setApiKey(SENDGRID_API_KEY)

// const app = express()

// app.use(bodyParser.json())

// app.post(async (req, res, next) => {
//   console.info('sendgrid--------------')
//   console.log(req.body)
//   const request = {
//     method: 'POST',
//     url: '/v3/mail/send',
//     body: {
//       personalizations: [
//         {
//           to: [{ email: req.body.email }],
//           subject: req.body.sub
//         }
//       ],
//       from: { email: SENDGRID_SENDER },
//       content: [
//         {
//           type: 'text/plain',
//           value: req.body.text
//         }
//       ]
//     }
//   }

//   try {
//     await Sendgrid.request(request)
//   } catch (err) {
//     next(err)
//     return
//   }

//   res.send('POST is sended.')
// })

// if (module === require.main) {
//   const PORT = process.env.PORT || 8080
//   app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`)
//     console.log('Press Ctrl+C to quit.')
//   })
// }

// // module.exports = app
// module.exports = {
//   path: '/api',
//   handler: router
// }
