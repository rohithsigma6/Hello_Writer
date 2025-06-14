// import jwt from 'jsonwebtoken'
// import config from '../../../config'
// import {
//   getUserService,
//   checkPasswordService,
//   getSecretsService,
// } from '../../services/user/user.service'
// import { Request, response, Response } from 'express'

// const adminLogin = async (req: Request, res: Response) => {
//     const { email, password } = req.body
//     if (!password || !email)
//       return res.status(400).send('Missing password or email')
  
//     const { user } = await getUserService({ email })
//     if (!user) return res.status(400).send('User not found')
  
//     const { secret } = await getSecretsService({ userId: user?._id })
//     console.log('secret', secret)
  
//     if (user.googleId && !secret?.hash) {
//       return res
//         .status(400)
//         .send('Please sign in with Google & set up your password.')
//     }
  
//     const passwordMatch = await checkPasswordService({
//       userId: user?._id,
//       password
//     })
//     if (!passwordMatch) {
//       return res.status(400).send('Invalid password')
//     }
  
//     const token = config.secretKeys.auth
//       ? jwt.sign({ user: user._id }, config.secretKeys.auth, { expiresIn: '30d' })
//       : null
  
//     if (!token) {
//       throw new Error('Auth secret key is not defined.')
//     }
//     const responseUser = { ...user, token }
//     res.status(200).json({
//       status: 'success',
//       body: {
//         user: responseUser
//       }
//     })
//   }
  
//   export default {
//     adminLogin,
//   }
  