import { celebrate, Joi, Segments } from 'celebrate'
import { genres, typeOfCreationEnum } from '../constants/file.constants'

const createFile = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().optional(),
      logline: Joi.string().optional(),
      theme: Joi.string().optional(),
      subTitle: Joi.string().optional(),
      basedOn: Joi.string().optional(),
      typeOfCreation: Joi.string().valid(...typeOfCreationEnum),
      secureStatus: Joi.string().optional(),
      prefix: Joi.string().optional(),
      genre: Joi.array()
        .optional()
        .items(Joi.string().valid(...Object.keys(genres)))
        .min(1)
        .optional(),
      subgenre: Joi.array()
        .items(Joi.string())
        .min(1)
        .optional()
        .custom((value, helpers) => {
          const { genre } = helpers.state.ancestors[0]
          const validSubgenresSet = new Set(
            genre.flatMap(selectedGenre => genres[selectedGenre])
          )
          const invalidSubgenres = value.filter(
            sub => !validSubgenresSet.has(sub)
          )
          if (invalidSubgenres.length) {
            return helpers.error('any.invalid', { details: invalidSubgenres })
          }
          return value
        }),
      pagetarget: Joi.number(),
      folderId: Joi.string().optional(),
      collaborators: Joi.array().items(Joi.object()).optional(),
      file: Joi.any().optional()
    })
  },
  { abortEarly: false }
)

export const validateFile = { createFile }
