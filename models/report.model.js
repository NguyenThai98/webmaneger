const db = require('../utils/db');
const TBL_REPORT = 'report';
const TBL_DEVICE = 'device';

module.exports = {
    all: function (limit, offset) {
        return db.load(`select * from ${TBL_REPORT} LIMIT ${limit} OFFSET ${offset}`);
    },
    findOne: async function (id) {
        const report = await db.load(`select * from ${TBL_REPORT} r JOIN ${TBL_DEVICE} d on r.id_device = d.id_device where r.id_account = ${id} ORDER BY id_report DESC LIMIT 10`);
        return report;
    },
    total_page: async function () {
        const total_page = await db.load(`select COUNT(*) AS total_page from ${TBL_REPORT}`);
        return total_page;
    },
    insertReport: function (entity) {
        return db.add(TBL_REPORT, entity);
    },
    updateReport: function (entity, condition) {
        return db.patch(TBL_REPORT, entity, condition);
    },
    findReport: async function (date_rent,date_back,id_report) {
        const report = await db.load(`select * from ${TBL_REPORT} where date_rent = '${date_rent}' and id_report = ${id_report} and date_back = '${date_back}' `);
        return report;
    },
}