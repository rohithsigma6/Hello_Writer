// //@ts-nocheck
// import { Database } from '@hocuspocus/extension-database'
// import { Logger } from '@hocuspocus/extension-logger'
// import { Server } from '@hocuspocus/server'
// import bodyParser from 'body-parser'
// import { errors } from 'celebrate'
// import cors from 'cors'
// import express from 'express'
// import { createServer } from 'http'
// import mongoose from 'mongoose'
// import routes from './api'
// import { attachResponseHelper } from './api/middlewares/response.middleware'
// import config from './config/index'
// import './config/mongoose'
// import { startVideoSocket } from './socket/videoSocketServer'
// import {
//   handleAllOtherErrors,
//   handleInvalidJson,
//   handleNotFound,
//   handleUnauthorized
// } from './utils/errors'
// import { getUserByIdService } from './api/services/user/user.service'
// import {
//   getSingleFileService,
//   updateFileService
// } from './api/services/file/file.service'
// import jwt from 'jsonwebtoken'
// import { setupSocketIO } from './socket/socket.config'
// import { Binary } from 'mongodb'
// import Razorpay from 'razorpay'
// import { updateScreenplayVersionService } from './api/services/file/screenplay-version.service'
// import File from './api/models/file.model'
// import { TiptapTransformer } from '@hocuspocus/transformer'
// import * as Y from 'yjs'
// import VersionHistory from './api/models/version-history.model'
// import { getScreenplayToWorkOn } from './api/services/file/versionHistory.service'

// const app = express()
// // Static route for Socket.IO Admin UI
// app.use(express.static('./node_modules/@socket.io/admin-ui/ui/dist'))

// const httpServer = createServer(app)

// // Connect to MongoDB
// mongoose.connect(config.databaseURL)
// export const instance = new Razorpay({
//   key_id: process.env.RAZERPAY_API_KEY || 'rzp_test_dhUy62KpTI3MWl',
//   key_secret: process.env.RAZERPAY_SECRET || 'i5WJLvYR8GlLbEwGW980Jmr0'
// })
// // Set up Hocuspocus Server for real-time collaboration (example)
// const server = Server.configure({
//   name: 'example-document',
//   port: 8080,
//   timeout: 30000,
//   debounce: 500,

//   onAuthenticate: async ({ documentName, token }) => {
//     if (!config.secretKeys.auth) {
//       throw new Error('Authentication secret is not defined.')
//     }
//     // Authenticate user via JWT
//     const decoded: any = await jwt.verify(token, config.secretKeys.auth)
//     if (!decoded) return Promise.reject()

//     const { user } = await getUserByIdService({ userId: decoded?.user })
//     if (!user || !user.isVerified || !documentName) return Promise.reject()

//     const { file, status } = await getSingleFileService({
//       fileId: documentName,
//       userId: user?._id
//     })

//     if (status !== 200) return Promise.reject()

//     return Promise.resolve({ user })
//   },
//   // Log connections
//   onConnect: async () => {
//     return Promise.resolve()
//   },

//   // Set up extensions for logging and database interaction
//   extensions: [
//     new Logger(),
//     new Database({
//       fetch: async ({ documentName, context, requestParameters }) => {
//         let document
//         const file = await File.findById(documentName)
//         if (!file) {
//           throw new Error('File not found')
//         }
//         const params = Object.fromEntries(requestParameters?.entries())
//         const versionName = params?.versionName
//         const versionColor = params?.versionColor
//         const editStatus = params?.editStatus
//         const versionHistoryId = params?.versionHistoryId
//         const screenplay = await getScreenplayToWorkOn({
//           fileId: documentName,
//           versionHistoryDetails: {
//             versionName,
//             versionColor,
//             editStatus
//           }
//         })
//         console.log(screenplay)
//         const versionIndex = file.screenplayVersions.findIndex(
//           v => v.versionName === versionName
//         )
//         if (versionIndex == -1) {
//           file.screenplayVersions.push({
//             userId: context.user._id, // Converted ObjectId
//             versionName: versionName || 'V1',
//             versionColor: versionColor || 'White',
//             editStatus: editStatus || 'PERSONAL DRAFT',
//             sceneIndex: '12',
//             screenplay: null
//           })
//         } else {
//           if (versionIndex !== -1) {
//             // Update existing version
//             if (versionColor) {
//               file.screenplayVersions[versionIndex].versionColor = versionColor
//             }
//             if (editStatus) {
//               console.log(editStatus)
//               file.screenplayVersions[versionIndex].editStatus = editStatus
//             }
//           }
//         }
//         await file.save()

//         const { file: mainFile, status } = await getSingleFileService({
//           fileId: documentName,
//           userId: context?.user?._id
//         })
//         const [screenplayVersion] = mainFile.screenplayVersions.filter(
//           sv => sv.versionName === versionName
//         )

//         if (screenplayVersion.screenplay) {
//           document = new Uint8Array(screenplayVersion.screenplay.data)
//         }
//         return document || undefined
//       },
//       store: async ({ documentName, state, context, requestParameters }) => {
//         const ydoc = new Y.Doc()
//         Y.applyUpdate(ydoc, new Uint8Array(state))
//         let json = TiptapTransformer.fromYdoc(ydoc)
//         // console.dir(json, { depth: null })

//         const params = Object.fromEntries(requestParameters?.entries())
//         const versionName = params?.versionName
//         const versionColor = params?.versionColor
//         const editStatus = params?.editStatus
//         let screenplay
//         // Function to log screenplay every 5 seconds
//         if (documentName !== 'GUEST-File-ID') {
//           const userId = context.user._id
//           const fileId = documentName
//           screenplay = new Binary(state) as any
//           await updateScreenplayVersionService({
//             fileId,
//             userId,
//             versionName,
//             versionColor,
//             editStatus,
//             screenplay
//           })
//         }
//         const logScreenplay = async () => {
//           // console.log('Current screenplay:', screenplay)
//         }
//         setInterval(logScreenplay, 5000)
//       }
//     })
//   ]
// })

// // Listen on the Hocuspocus server
// server.listen()

// // Set up CORS
// const whitelist = [
//   config.url.frontendBaseUrl,
//   'https://dsa7mnbizwu2i.cloudfront.net',
//   /dev-.*\.screenplay\.ink$/,
//   /http:\/\/localhost:.*/,
//   'https://staging.screenplay.ink',
//   'https://staging-api.screenplay.ink',
//   'https://staging-mono.screenplay.ink',
//   'https://prod-mono.screenplay.ink',
//   'https://dev.screenplay.ink',
//   'https://dev-api.screenplay.ink',
//   'https://dashboard.screenplay.ink',
//   'https://production-api.screenplay.ink'
// ]

// app.use(
//   cors({
//     origin: whitelist as any,
//     methods: 'GET,POST,PUT,DELETE,PATCH',
//     credentials: true
//   })
// )

// // Body parsing middleware
// app.use(bodyParser.json({ limit: '50mb' }))
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(attachResponseHelper)

// // Routes
// app.use(config.api.prefix, routes)

// // Error handling middleware
// app.use(errors())
// app.use(handleInvalidJson)
// app.use(handleUnauthorized)
// app.use(handleNotFound)
// app.use(handleAllOtherErrors)

// // Start Video Socket
// startVideoSocket()

// // Set up and initialize Socket.IO (moved to a separate file)
// setupSocketIO(httpServer)

// // Start the HTTP server
// httpServer.listen(config.port, () => {
//   console.log(`> Server online [http://localhost:${config.port}]`)
// })
//@ts-nocheck
import { Database } from '@hocuspocus/extension-database'
import { Logger } from '@hocuspocus/extension-logger'
import { Server } from '@hocuspocus/server'
import bodyParser from 'body-parser'
import { errors } from 'celebrate'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import { createServer } from 'http'
import mongoose from 'mongoose'
import routes from './api'
import { attachResponseHelper } from './api/middlewares/response.middleware'
import config from './config/index'
import './config/mongoose'
import { startVideoSocket } from './socket/videoSocketServer'
import {
  handleAllOtherErrors,
  handleInvalidJson,
  handleNotFound,
  handleUnauthorized
} from './utils/errors'
import { getUserByIdService } from './api/services/user/user.service'
import {
  getSingleFileService,
  updateFileService
} from './api/services/file/file.service'
import jwt from 'jsonwebtoken'
import { setupSocketIO } from './socket/socket.config'
import { Binary } from 'mongodb'
import Razorpay from 'razorpay'
// import { updateScreenplayVersionService } from './api/services/file/screenplay-version.servicS
import File from './api/models/file.model'
import passport from 'passport'
import { TiptapTransformer } from '@hocuspocus/transformer'
import * as Y from 'yjs'
import VersionHistory from './api/models/version-history.model'
import {
  getScreenplayToWorkOn,
  updateScreenplayVersionService
} from './api/services/file/versionHistory.service'
import './config/passportConfig'
const app = express()
// Static route for Socket.IO Admin UI
app.use(express.static('./node_modules/@socket.io/admin-ui/ui/dist'))

const httpServer = createServer(app)

// Connect to MongoDB
mongoose.connect(config.databaseURL)
export const instance = new Razorpay({
  key_id: process.env.RAZERPAY_API_KEY || 'rzp_test_dhUy62KpTI3MWl',
  key_secret: process.env.RAZERPAY_SECRET || 'i5WJLvYR8GlLbEwGW980Jmr0'
})
// Set up Hocuspocus Server for real-time collaboration (example)
const server = Server.configure({
  name: 'example-document',
  port: 8080,
  timeout: 60000,
  debounce: 800,
  onAuthenticate: async ({ documentName, token }) => {
    const fileId = await File.findById(documentName.split('-')[0])
    if (!config.secretKeys.auth) {
      throw new Error('Authentication secret is not defined.')
    }
    // Authenticate user via JWT
    const decoded: any = await jwt.verify(token, config.secretKeys.auth)
    if (!decoded) return Promise.reject()

    const { user } = await getUserByIdService({ userId: decoded?.user })
    if (!user || !user.isVerified || !documentName) return Promise.reject()

    const reqFileId = documentName.split('-')[0]

    const { file, status } = await getSingleFileService({
      fileId: reqFileId,
      userId: user?._id
    })

    if (status !== 200) return Promise.reject()

    return Promise.resolve({ user })
  },
  // Log connections
  onConnect: async () => {
    return Promise.resolve()
  },

  // Set up extensions for logging and database interaction
  extensions: [
    new Logger(),
    new Database({
      fetch: async ({ documentName, context, requestParameters }) => {
        const reqFileId = documentName.split('-')[0]
        let document
        const file = await File.findById(reqFileId)
        if (!file) {
          throw new Error('File not found')
        }
        const params = Object.fromEntries(requestParameters?.entries())
        const versionName = params?.versionName
        const versionColor = params?.versionColor
        const editStatus = params?.editStatus
        const versionIndex = params?.versionIndex
        console.log(versionColor)
        console.log(editStatus)
        const screenplay = await getScreenplayToWorkOn({
          fileId: reqFileId,
          versionHistoryDetails: {
            versionName,
            versionColor,
            editStatus,
            versionIndex
          }
        })
        return screenplay
      },
      store: async ({ documentName, state, context, requestParameters }) => {
        const reqFileId = documentName.split('-')[0]
        const ydoc = new Y.Doc()
        Y.applyUpdate(ydoc, new Uint8Array(state))
        let json = TiptapTransformer.fromYdoc(ydoc)
        // console.dir(json, { depth: null })

        const params = Object.fromEntries(requestParameters?.entries())
        const versionName = params?.versionName
        const versionColor = params?.versionColor
        const editStatus = params?.editStatus

        let screenplay
        // Function to log screenplay every 5 seconds
        if (reqFileId !== 'GUEST-File-ID') {
          const userId = context.user._id
          const fileId = reqFileId
          // Convert the state into a Binary type (or similar) as needed.
          const screenplay = new Binary(state)
          await updateScreenplayVersionService({
            fileId,
            userId,
            versionName,
            versionColor,
            editStatus,
            screenplay
          })
        }
      }
    })
  ]
})

// Listen on the Hocuspocus server
server.listen()

// Set up CORS
const whitelist = [
  config.url.frontendBaseUrl,
  'https://dsa7mnbizwu2i.cloudfront.net',
  /dev-.*\.screenplay\.ink$/,
  /http:\/\/localhost:.*/,
  'https://staging.screenplay.ink',
  'https://staging-api.screenplay.ink',
  'https://staging-mono.screenplay.ink',
  'https://prod-mono.screenplay.ink',
  'https://dev.screenplay.ink',
  'https://dev-api.screenplay.ink',
  'https://dashboard.screenplay.ink',
  'https://production-api.screenplay.ink'
]

app.use(
  cors({
    origin: whitelist as any,
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true
  })
)

// Body parsing middleware
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: config.session.secret || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(attachResponseHelper)
// Routes
app.use(config.api.prefix, routes)

// Error handling middleware
app.use(errors())
app.use(handleInvalidJson)
app.use(handleUnauthorized)
app.use(handleNotFound)
app.use(handleAllOtherErrors)

// Start Video Socket
startVideoSocket()

// Set up and initialize Socket.IO (moved to a separate file)
setupSocketIO(httpServer)

// Start the HTTP server
httpServer.listen(config.port, () => {
  console.log(`> Server online [http://localhost:${config.port}]`)
})
