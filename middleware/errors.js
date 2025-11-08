const { validationResult } = require('express-validator');

const handleValidationErrors = (err, req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      success: false,
      errors: errors.array(),
    });
  }

 
 
  return res.status(500).json({
    message: err.message || "Something went wrong",
    success: false,
  });
};

module.exports = { handleValidationErrors }; 