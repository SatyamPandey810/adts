const { body } = require("express-validator")


exports.validateCreateApp_inst = [
    body("machine_uuid")
        .exists({ checkFalsy: true }).withMessage('Machine UUID is required')
        .isString().withMessage('Machine UUID must be a string')
        .trim()
        .isLength({ min: 5, max: 100 }).withMessage('Machine UUID must be between 5 and 100 characters'),
    body("rto_code")
        .exists({ checkFalsy: true }).withMessage("Rto code is required")
        .isString().withMessage("Rto code must be a string")
        .trim(),
    body("ip_address")
        .exists({ checkFalsy: true }).withMessage("IP Address is required")
        .bail()
        .isIP()
        .withMessage("Must be a valid IP address"),

]