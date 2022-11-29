import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PORT: Joi.number(),
  POSTGRES_USER: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_DB: Joi.string(),
  POSTGRES_DB_LAUNCHY: Joi.string(),
  DATABASE_URL: Joi.string(),
  DATABASE_URL_LAUNCHY: Joi.string(),
  PORT: Joi.number(),
  ADMIN_EMAIL: Joi.string(),
  ADMIN_PASSWORD: Joi.string(),
});
