import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config'
import UserModel from '../models/user.model'
import User from '../models/user.model'

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header('Authorization')
  token = token ? token.split(' ')[1] : undefined

  try {
    if (token) {
      if (!config.secretKeys.auth) {
        throw new Error('Auth secret key is not defined.')
      }

      const decoded: any = jwt.verify(token, config.secretKeys.auth)
      if (!decoded) {
        return res.status(401).send('Token invalid')
      }

      const user = await UserModel.findById(decoded?.user)
      if (!user) {
        return res.status(401).send('User not found')
      }

      if (!user.isVerified) {
        return res.status(401).send('User not verified')
      }

      if (!user.role) {
        return res.redirect(config.url.frontendBaseUrl + '/register/role')
      }

      req.user = user
    } else {
      return res.status(401).send('User is not authenticated.')
    }
    next()
  } catch (error: any) {
    if (error) {
      return res.redirect(config.url.frontendBaseUrl + '/auth/login')
    }
    res.status(500).send('Internal Server Error')
  }
}

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.header('Authorization')
  token = token ? token.split(' ')[1] : undefined

  try {
    if (token) {
      if (!config.secretKeys.auth) {
        throw new Error('Auth secret key is not defined.')
      }

      const decoded: any = jwt.verify(token, config.secretKeys.auth)
      if (!decoded) {
        return res.status(401).send('Token invalid')
      }

      const user = await UserModel.findById(decoded?.user)
      if (!user) {
        return res.status(401).send('User not found')
      }

      if (!user.isVerified) {
        return res.status(401).send('User not verified')
      }
      if (!user.isAdmin) {
        return res.status(403).send('Access denied. Admins only.')
      }

      req.user = user
    } else {
      return res.status(401).send('User is not authenticated.')
    }
    next()
  } catch (error: any) {
    console.error(error)
    if (error.name === 'TokenExpiredError') {
      return res.redirect(config.url.frontendBaseUrl + '/auth/login')
    }
    res.status(500).send('Internal Server Error')
  }
}

export const hybridAuth = async (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    // ✅ Session-based auth (passport-local)
    return next()
  }

  let token = req.header('Authorization')
  token = token ? token.split(' ')[1] : undefined
  try {
    if (token) {
      if (!config.secretKeys.auth) {
        throw new Error('Auth secret key is not defined.')
      }

      const decoded: any = jwt.verify(token, config.secretKeys.auth)
      if (!decoded) {
        return res.status(401).send('Token invalid')
      }

      const user = await UserModel.findById(decoded?.user)
      if (!user) {
        return res.status(401).send('User not found')
      }

      if (!user.isVerified) {
        return res.status(401).send('User not verified')
      }

      if (!user.role) {
        return res.redirect(config.url.frontendBaseUrl + '/register/role')
      }

      req.user = user
    } else {
      return res.status(401).send('User is not authenticated.')
    }
    next()
  } catch (error: any) {
    if (error) {
      return res.redirect(config.url.frontendBaseUrl + '/auth/login')
    }
    res.status(500).send('Internal Server Error')
  }
}

export default authenticateToken
