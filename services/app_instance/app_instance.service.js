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

exports.getAppinstannce = async (filter) => {
    try {
        const { app_name, ip_address, app_inst_id } = filter

        if (!filter || filter.length === 0) {
            throw new Error("please provide any filter")
        }
        const filters = {};
        if (app_inst_id) {
            const idList = app_inst_id.split(",").map(id => id.trim());
            filters.guid = { in: idList };
        }
        const instances = await prisma.app_instance.findMany({
            where: filters,
            include: {
                apps: true,
            },
        });

        if (!instances || instances.length === 0) {
            throw new Error(`No App Instances found for  ${filter}`);
        }
        const format = instances.map((inst) => ({
            app_inst_id: inst.guid,
            machine_uuid: inst.machine_uuid,
            ip_address: inst.ip_address,
            rto_code: inst.rto_code,
            app_name: inst.apps.app_name
        }))

        return format
    } catch (error) {
        console.log(error);

        throw error
    }
}

exports.updateAppInstUpdate = async (id, data) => {
    const { machine_uuid, ip_address, ...rest } = data

    const updateData = {}
    if (machine_uuid) {
        updateData.machine_uuid = machine_uuid.trim()
    }
    if (ip_address) {
        updateData.ip_address = ip_address.trim()
    }
    try {
        const result = await prisma.app_instance.updateMany({
            where: { guid: id },
            data: updateData
        })

        if (result.count === 0) {
            throw new Error(`No record found for the given ${id}`);
        }
    } catch (error) {
        throw Error(error)
    }
}