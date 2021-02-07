const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = "Pole powinno zawierać co najmniej ${err.local.limit} znaki";
                break;
            case "string.max":
                err.message = "Pole powinno zawierać co najwyżej ${err.local.limit} znaki";
                break;
            case "number.base":
                err.message = "Pole jest wymagane";
                break;
            case "number.min":
                err.message = "Liczba nie może być mniejsza od 0";
                break;
            default:
                break;
        }
    });
    return errors;
}

const tournamentSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    location: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    price: Joi.number()
        .min(0)
        .required()
        .error(errMessages)
});

module.exports = tournamentSchema;