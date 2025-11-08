const express = require("express")
const { createAppInstanceController } = require("./app_instance.controller")
const { validateCreateApp_inst } = require("./app_instance.validation")
const { handleValidationErrors } = require("../../middleware/errors")
const router = express.Router()

router.post("/appInstance", validateCreateApp_inst, handleValidationErrors, createAppInstanceController)



exports.appInstanceRouter = router