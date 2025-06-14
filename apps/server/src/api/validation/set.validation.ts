// const { celebrate, Joi, Segments } = require("celebrate");
import { celebrate, Joi, Segments } from "celebrate";

const createSet = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string(),
            fileId: Joi.string(),
            filmLocationId: Joi.string(),
        }),
    },
    { abortEarly: false }
);

export const validateSet = { createSet };

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
