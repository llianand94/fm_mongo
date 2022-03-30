const yup = require('yup');


module.exports.emailSchema = yup
  .string()
  .email()
  .required();
