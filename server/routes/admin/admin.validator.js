const { body, param } = require('express-validator');

exports.createAndUpdateSupervisorValidator = [
    body('name')
        .trim()

        .notEmpty()
        .withMessage(`Name is required`)
];