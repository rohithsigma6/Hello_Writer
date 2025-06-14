import { celebrate, Joi, Segments } from 'celebrate'

export const register = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      // username: Joi.string(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNo: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required().messages({
        'string.empty': `Your {#label} can not be empty`,
        'string.min': `Your {#label} has to be at least {#limit} chars`,
        'any.required': `Your {#label} is required`
      }),
      role: Joi.string(),
      lifetimeRegistered: Joi.boolean(),
      isAdmin: Joi.boolean()
    })
  },
  { abortEarly: false }
)

export const login = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      // username: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    })
  },
  { abortEarly: false }
)

export const validateUser = { login, register }
