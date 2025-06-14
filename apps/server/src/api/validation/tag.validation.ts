// const { celebrate, Joi, Segments } = require("celebrate");
import { celebrate, Joi, Segments } from "celebrate";

const createTag = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        userId: Joi.string(),
        fileId: Joi.string(),
        sceneId: Joi.string(),
        categoryId:Joi.string(),
        }),
    },
    { abortEarly: false }
);

export const validateTag = { createTag };

// exports.udpateTag = celebrate(
//     {
//         [Segments.BODY]: Joi.object().keys({
//         name: Joi.string().required(),
//         userId: Joi.string(),
//         color: Joi.string(),
//         notes: Joi.string(),
//         }),
//     },
//     { abortEarly: false }
// );
