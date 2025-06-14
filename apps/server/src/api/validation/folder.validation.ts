import { celebrate, Joi, Segments } from "celebrate";

const createFolder = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().min(3).max(50).required(),
            Files: Joi.array().items(Joi.string()),
            collaborators: Joi.array().items(Joi.object()),
        }),
    },
    { abortEarly: false }
);

const updateFolder = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().min(3).max(50).optional(),
            Files: Joi.array().items(Joi.string()).optional(),
        }),
        [Segments.PARAMS]: Joi.object().keys({
            folderId: Joi.string().required(),
        }),
    },
    { abortEarly: false }
);

export const validateFolder = { createFolder, updateFolder };
