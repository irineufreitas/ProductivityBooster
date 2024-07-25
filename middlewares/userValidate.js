const { body, validationResult } = require('express-validator');

const validateUser = [
    body('username').trim().notEmpty().withMessage('Username cannot be empty'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').notEmpty().withMessage('Role must be provided')
];

const validateUserUpdate = [
    body('username').trim().optional().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().isEmail().withMessage('Must be a valid email address'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().notEmpty().withMessage('Role must be provided')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateUser, validateUserUpdate, validate };
