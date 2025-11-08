const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { randomUUID } = require("crypto")

const processData = (data) => {
    return {
        ...data,
        machine_uuid: data.machine_uuid?.trim(),
        guid: data.guid?.trim() || randomUUID(),
        rto_code: data.rto_code.trim(),
        ip_address: data.ip_address.trim(),
        app_name: data.app_name?.trim() || null

    }
}

exports.createAppInstance = async (data) => {
    try {
        const proccced = processData(data)

        const appNameExist = await prisma.apps.findUnique({
            where: { app_name: proccced.app_name }
        })
        
        if (!appNameExist) {
            throw new Error(`${data.app_name} not found in apps`)
        }

        const finalData = {
            guid: proccced.guid,
            machine_uuid: proccced.machine_uuid,
            rto_code: proccced.rto_code,
            ip_address: proccced.ip_address,
            app_id: appNameExist.app_id
        }

        const creatAppInstance = await prisma.app_instance.create({
            data: finalData,
            select: { guid: true }
        })
        return creatAppInstance.guid

    } catch (error) {

        throw error
    }
}