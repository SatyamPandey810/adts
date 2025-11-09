const express = require("express")
const { createAppInstanceController, getAppInstanceController, updateAppInstanceContrller } = require("./app_instance.controller")
const { validateCreateApp_inst } = require("./app_instance.validation")
const { handleValidationErrors } = require("../../middleware/errors")
const router = express.Router()

router.post("/appinstance", validateCreateApp_inst, handleValidationErrors, createAppInstanceController)
router.get("/appinstance", getAppInstanceController)
router.put("/appinstance/:id", updateAppInstanceContrller)


exports.appInstanceRouter = router
