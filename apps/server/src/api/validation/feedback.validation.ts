import { celebrate, Joi, Segments } from "celebrate";


const GiveFeedback = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            feedback_type: Joi.string().required(),
            feedback_text: Joi.string().required(),
            attached_file: Joi.any(),
            star_rating: Joi.number()
        }),
    },
    { abortEarly: false }
);

export const validateFeedback = { GiveFeedback };
