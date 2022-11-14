import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
});

export const daySchema = Joi.object(
    {
        day: Joi.number().required(),
    }
);

export const descriptionSchema = Joi.object(
    {
        description: Joi.string().required(),
    }
)

export const taskSchema = Joi.object(
    {
        name: Joi.string().required(),
        description: Joi.string(),
    }
)