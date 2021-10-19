import * as Joi from '@hapi/joi';

export const config = {
  validationSchema: Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    SERVER_PORT: Joi.number(),
    APP_NAME: Joi.string().required(),
  }),
};
