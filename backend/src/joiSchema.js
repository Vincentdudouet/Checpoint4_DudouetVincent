const Joi = require("joi");

const schemaForUpdateUser = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .allow(null, ""),
  imgLink: Joi.string().max(80),
});

const schemaForCreation = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr"] },
    })
    .required(),
  agence: Joi.string().min(2).max(255).required(),
  lastname: Joi.string().min(2).max(255).required(),
  firstname: Joi.string().min(2).max(255).required(),
});

const schemaForLogin = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr"] },
    })
    .required(),
});

const schemaForProject = Joi.object({
  title: Joi.string().max(255),
  description: Joi.string(),
});

module.exports = {
  schemaForLogin,
  schemaForUpdateUser,
  schemaForProject,
  schemaForCreation,
};
