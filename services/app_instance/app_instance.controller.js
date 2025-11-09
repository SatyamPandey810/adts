const { validationResult } = require("express-validator");
const { createAppInstance, getAppinstannce, updateAppInstUpdate } = require("./app_instance.service")

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

exports.getAppInstanceController = async (req, res) => {
    try {
        // const { filter } = req.query
        const appInst = await getAppinstannce(req.query)

        res.status(200).json({
            success: true,
            message: "App instance Fetch Successfully",
            data: appInst
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
exports.updateAppInstanceContrller = async (req, res) => {
    try {
        const { id } = req.params
        await updateAppInstUpdate(id, req.body)
        res.status(200).json({
            success: true,
            message: "App instance updated successfully",
            data: []
        })

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}