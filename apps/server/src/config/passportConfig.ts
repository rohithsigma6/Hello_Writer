import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../api/models/user.model'
import { checkPasswordService } from '../api/services/user/user.service'

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async function (
    email: string,
    password: string,
    done: any
  ) {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null, false, { message: 'User not found' })
      }
      // const passwordMatch = await checkPasswordService({
      //   userId: user._id as string,
      //   password
      // })
      // if (!passwordMatch) {
      //   return done(null, false, { message: 'Invalid password' })
      // }
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)
passport.serializeUser((user, done) => {
  try {
    done(null, user._id)
  } catch (err) {
    done(err)
  }
})

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id)
    if (!user) {
      return done(new Error('User not found'))
    }
    done(null, user)
  } catch (err) {
    done(err)
  }
})
