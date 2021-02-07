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
            case "date.base":
                err.message = "Data jest wymagana";
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

const gameSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    name: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    date: Joi.date()
        .required()
        .error(errMessages),
    turs: Joi.number()
        .min(0)
        .required()
        .error(errMessages),
    tournament: Joi.string()
        .required()
        .error(errMessages)
});

module.exports = gameSchema;