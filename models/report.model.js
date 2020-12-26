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
    findReport: async function (date_rent, date_back, id_report) {
        const report = await db.load(`select * from ${TBL_REPORT} where date_rent = '${date_rent}' and id_report = ${id_report} and date_back = '${date_back}' `);
        return report;
    },
    allPage: async function (id_account) {
        const allpage = await db.load(
            `SELECT COUNT(*) as totalPage
        from report r 
        JOIN account a on r.id_account = a.id_account 
        JOIN report_status rs on r.id_report_status = rs.id_report_status
        JOIN device d on r.id_device = d.id_device
        join product p 
		on d.id_product = p.id_product
		join category c
		on p.id_category=c.id_category
		join shelf s
		on c.id_shelf = s.id_shelf
        WHERE a.id_account = ${id_account} 
        order by r.id_report`);
        return allpage[0].totalPage;
    },
    allPageAdmin: async function () {
        const allpage = await db.load(
            `SELECT COUNT(*) as totalPage
        from report r 
        JOIN account a on r.id_account = a.id_account 
        JOIN report_status rs on r.id_report_status = rs.id_report_status
        JOIN device d on r.id_device = d.id_device
        join product p 
		on d.id_product = p.id_product
		join category c
		on p.id_category=c.id_category
		join shelf s
		on c.id_shelf = s.id_shelf
        order by r.id_report`);
        return allpage[0].totalPage;
    },
    historyActionPage: async function (id_account, limit, offset) {
        const historyAction = await db.load(`select r.date_rent,r.date_back, a.full_name,a.rfid,rs.name_report_status,d.name_device, s.name_shelf
        from report r 
        JOIN account a on r.id_account = a.id_account 
        JOIN report_status rs on r.id_report_status = rs.id_report_status
        JOIN device d on r.id_device = d.id_device
        join product p 
		on d.id_product = p.id_product
		join category c
		on p.id_category=c.id_category
		join shelf s
		on c.id_shelf = s.id_shelf
        WHERE a.id_account = ${id_account} 
        order by r.id_report desc limit ${limit} offset ${offset}`);
        return historyAction;
    },
    historyActionPageAdmin: async function (limit, offset) {
        const historyAction = await db.load(`select r.date_rent,r.date_back, a.full_name,a.rfid,rs.name_report_status,d.name_device, s.name_shelf
        from report r 
        JOIN account a on r.id_account = a.id_account 
        JOIN report_status rs on r.id_report_status = rs.id_report_status
        JOIN device d on r.id_device = d.id_device
        join product p 
		on d.id_product = p.id_product
		join category c
		on p.id_category=c.id_category
		join shelf s
		on c.id_shelf = s.id_shelf
        order by r.id_report desc limit ${limit} offset ${offset}`);
        return historyAction;
    },
    exportBorrow: async function () {
        const exportborrow = await db.load(`select d.name_device,s.name_shelf,rs.name_report_status,r.date_rent,a.full_name
        from report r 
        JOIN account a on r.id_account = a.id_account 
        JOIN report_status rs on r.id_report_status = rs.id_report_status
        JOIN device d on r.id_device = d.id_device
        join product p 
		on d.id_product = p.id_product
		join category c
		on p.id_category=c.id_category
		join shelf s
		on c.id_shelf = s.id_shelf
		where rs.id_report_status = 1
        order by r.id_report desc`);
        return exportborrow;
    },
    exportBack: async function () {
        const exportback = await db.load(`select d.name_device,s.name_shelf,rs.name_report_status,r.date_back,a.full_name
        from report r 
        JOIN account a on r.id_account = a.id_account 
        JOIN report_status rs on r.id_report_status = rs.id_report_status
        JOIN device d on r.id_device = d.id_device
        join product p 
		on d.id_product = p.id_product
		join category c
		on p.id_category=c.id_category
		join shelf s
		on c.id_shelf = s.id_shelf
		where rs.id_report_status = 2
        order by r.id_report desc`);
        return exportback;
    },
    exportGet: async function () {
        const exportget = await db.load(`select d.name_device,s.name_shelf,rs.name_report_status,r.date_rent,a.full_name
        from report r 
        JOIN account a on r.id_account = a.id_account 
        JOIN report_status rs on r.id_report_status = rs.id_report_status
        JOIN device d on r.id_device = d.id_device
        join product p 
		on d.id_product = p.id_product
		join category c
		on p.id_category=c.id_category
		join shelf s
		on c.id_shelf = s.id_shelf
		where rs.id_report_status = 3
        order by r.id_report desc`);
        return exportget;
    },
    deviceRemaining: async (limit,offset)=>{
        const deviceremaining = await db.load(`select d.name_device, s.name_shelf
        from device d 
        join product p 
		on d.id_product = p.id_product
		join category c
		on p.id_category=c.id_category
		join shelf s
		on c.id_shelf = s.id_shelf
        where d.status = 0
        limit ${limit} offset ${offset}`)
        return deviceremaining;
    },
    pageRemaining: async function(){
        const allpage = await db.load(
        `SELECT COUNT(*) as totalPage
        from device d 
        join product p 
		on d.id_product = p.id_product
		join category c
		on p.id_category=c.id_category
		join shelf s
		on c.id_shelf = s.id_shelf
		where d.status = 0`);
        return allpage[0].totalPage;
    }

}