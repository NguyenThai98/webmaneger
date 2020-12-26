const db = require('../utils/db');
const TBL_DEVICE = 'device';

module.exports = {
    all: function () {
        return db.load(`select * from ${TBL_DEVICE}`);
    },
    findDevice: async function (id) {
        const device = await db.load(`select * from ${TBL_DEVICE} where id_device = ${id}`);
        return device[0];
    },
    findDeviceRFID: async function (rfid) {
        const device = await db.load(`select * from ${TBL_DEVICE} where rfid = '${rfid}'`);
        return device[0];
    },
    findDeviceBR: async function (id) {
        const deviceBR = await db.load(`select * from device d JOIN report r on d.id_device = r.id_device join account a on r.id_account = a.id_account WHERE d.id_device = ${id} and r.id_report_status = 1 ORDER BY id_report DESC`);
        return deviceBR[0];
    }, // n
    selectSlot: async function (id) {
        const shelf = await db.load(`SELECT DISTINCT s.id_shelf, s.total_slot,s.total_slotEmpty FROM device d join product p on d.id_product = p.id_product join category c on p.id_category = p.id_category join shelf s on c.id_shelf = s.id_shelf WHERE d.id_device = ${id}`);
        return shelf[0];
    },
    updateStatus: function (entity, condition) {
        return db.patch(TBL_DEVICE, entity, condition);
    },
    selectUserTakenTool: function (id_device) {
        return db.load(`select a.full_name,r.date_rent,r.date_back from report r JOIN account a on r.id_account = a.id_account WHERE r.id_device = ${id_device} and check_status = 'TAKEN' `);
    },
    getDevice: async function (rfid) {
        const device = await db.load(`select * from report r JOIN account a on r.id_account = a.id_account join device d on d.id_device = r.id_device WHERE d.rfid = '${rfid}' GROUP BY r.id_report DESC LIMIT 1`);
        return device[0];
    },
    historyTakenTool: async function (name_device) {
        const device = await db.load(`select * from report r JOIN account a on r.id_account = a.id_account join device d on d.id_device = r.id_device WHERE d.name_device = '${name_device}' and r.check_status = 'TAKEN' GROUP BY r.id_report DESC limit 5`);
        return device;
    },
    getNameProduct: async function () {
        return await db.load(`select p.name_product,p.id_product from product p`);
    },
    getProduct: async function (id_product) {
        return await db.load(`select * from product p JOIN device d on p.id_product = d.id_product WHERE d.id_product = ${id_product}`);
    },
    addDevice: function (entity) {
        db.add(TBL_DEVICE, entity);
    },
}