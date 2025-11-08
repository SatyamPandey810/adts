const { validationResult } = require("express-validator");
const { createAppInstance } = require("./app_instance.service")

exports.createAppInstanceController = async (req, res) => {
    try {
        const newappInstance = await createAppInstance(req.body)

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
            });
        }
        res.status(200).json({
            success: true,
            message: "App instance created succefully",
            app_inst_id: newappInstance
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}