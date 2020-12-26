const reportModel = require('../models/report.model');
const excel = require('node-excel-export');
const userModel = require('../models/user.model');
const moment = require('moment');
const styles = {
    headerDark: {
        fill: {
            fgColor: {
                rgb: 'FF000000'
            }
        },
        font: {
            color: {
                rgb: 'FFFFFFFF'
            },
            sz: 14,
            bold: true,
            underline: true
        }
    },
    cellPink: {
        fill: {
            fgColor: {
                rgb: 'FFFFCCFF'
            }
        }
    },
    cellGreen: {
        fill: {
            fgColor: {
                rgb: 'FF00FF00'
            }
        }
    }
};
const reportCtl = {
    getAllReport: async (req, res) => {
        const { role_account } = res.locals.lcAuthUser;
        if (role_account != 1) {
            return res.status(400).json({ msg: "Account Denied" });
        } else {
            const limit = 8;
            let page = req.query.page || 1;
            if (page < 0) {
                page = 1;
            }
            let offset = (page - 1) * limit;
            const row = await reportModel.all(limit, offset);
            const total_page = await reportModel.total_page();

            const nPage = Math.ceil(total_page / limit);
            let pages_item = [];
            for (let i = 1; i <= nPage; i++) {
                const item = {
                    value: i,
                    isActive: i == page
                }
                pages_item.push(item);
            }
            res.render('report/list', {
                list: row,
                pages_item,
                next: +page + 1,
                prev: +page - 1,
                can_go_prev: page <= 1,
                can_go_next: page >= nPage,
            })
        }
    },
    getReportOne: async (req, res) => {
        const { id_account } = res.locals.lcAuthUser;
        const reportUser = await reportModel.findOne(+id_account);
        for (let index = 0; index < reportUser.length; index++) {
            if (reportUser[index].check_status == 'BORROW') {
                reportUser[index].check_status = 'Mượn';
            } else if (reportUser[index].check_status == 'TAKEN') {
                reportUser[index].check_status = 'Lấy';
            } else if (reportUser[index].check_status == 'REGISTER') {
                reportUser[index].check_status = 'Chờ duyệt';

            } else if (reportUser[index].check_status == 'RETURN_ITEM') {
                reportUser[index].check_status = 'Đã trả';

            } else if (reportUser[index].check_status == 'REFUSE') {
                reportUser[index].check_status = 'Bị từ chối';

            } else if (reportUser[index].check_status == 'ACCEPT') {
                reportUser[index].check_status = 'Đã được duyệt';
                reportUser[index].isAccept = true;

            }
        }
        res.render('report/listReportUser', {
            reportUser
        });

    },
    historyAction: async (req, res) => {
        const { id_account } = res.locals.lcAuthUser;
        const limit = 10;
        let page = req.query.page || 1;
        if (page < 0) {
            page = 1;
        }
        let offset = (page - 1) * limit;
        let historyAction = [];
        if (res.locals.PHAN_QUYEN_CAP_NHAT_MK) {
            historyAction = await reportModel.historyActionPageAdmin(limit, offset);
            allPage = await reportModel.allPageAdmin();
        } else {
            historyAction = await reportModel.historyActionPage(id_account, limit, offset);
            allPage = await reportModel.allPage(id_account);
        }
        for (let index = 0; index < historyAction.length; index++) {
            if (historyAction[index].date_back == null) {
                historyAction[index].isBack = false;
            } else {
                historyAction[index].isBack = true;
            }
            if (historyAction[index].date_back != null) {
                let date = new Date(+historyAction[index].date_back);
                let y = date.getFullYear();
                let m = date.getMonth();
                let d = date.getDate();
                let hh = date.getHours();
                let pp = date.getMinutes();
                let time = d + '/' + m + '/' + y + ":" + hh + "/" + pp;
                historyAction[index].date_back = time;
            }
            if (historyAction[index].date_rent != null) {
                let date = new Date(+historyAction[index].date_rent);
                let y = date.getFullYear();
                let m = date.getMonth();
                let d = date.getDate();
                let hh = date.getHours();
                let pp = date.getMinutes();
                let time = d + '/' + m + '/' + y + "  " + hh + " : " + pp;
                historyAction[index].date_rent = time;
            }


        }
        const nTrang = Math.ceil(allPage / limit);
        let pages_item = [];
        for (let i = 1; i <= nTrang; i++) {
            const item = {
                value: i,
                isActive: i == page
            }
            pages_item.push(item);
        }
        res.render('report/allHistory', {
            historyAction,
            pages_item,
            next: +page + 1,
            prev: +page - 1,
            can_go_prev: page <= 1,
            can_go_next: page >= nTrang,
        })
    }, //n
    allPage: async function (req, res) {
        const page = await reportModel.allPage();
        res.json(page)
    },
    export: async function (req, res) {
        const specification = {
            full_name: { // <- the key should match the actual data key
                displayName: 'full_name', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                width: 120 // <- width in pixels
            },
            user_name: {
                displayName: 'user_name',
                headerStyle: styles.headerDark,
                width: '10' // <- width in chars (when the number is passed as string)
            },
            position_detail: {
                displayName: 'position_detail',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            },
            rf_id: {
                displayName: 'rf_id',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            }
        }
        const dataset = await userModel.allUser();


        const report = excel.buildExport(
            [
                {
                    name: 'Report',

                    specification: specification,
                    data: dataset
                }
            ]
        );
        res.attachment('report.xlsx');
        res.send(report);
    },
    exportBorrow: async function (req, res) {
        const specification = {
            name_device: { // <- the key should match the actual data key
                displayName: 'Ten thiet bi', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                width: 120 // <- width in pixels
            },
            name_shelf: {
                displayName: 'Ten tu',
                headerStyle: styles.headerDark,
                width: '10' // <- width in chars (when the number is passed as string)
            },
            name_report_status: {
                displayName: 'Hanh dong',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            },
            date_rent: {
                displayName: 'Ngay muon',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            },
            full_name: { // <- the key should match the actual data key
                displayName: 'Nguoi muon', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                width: 120 // <- width in pixels
            }
        }
        const dataset = await reportModel.exportBorrow();


        const report = excel.buildExport(
            [
                {
                    name: 'ReportBorrow',

                    specification: specification,
                    data: dataset
                }
            ]
        );
        res.attachment('reportBorrow.xlsx');
        res.send(report);
    },
    exportBack: async function (req, res) {
        const specification = {
            name_device: { // <- the key should match the actual data key
                displayName: 'Ten thiet bi', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                width: 120 // <- width in pixels
            },
            name_shelf: {
                displayName: 'Ten tu',
                headerStyle: styles.headerDark,
                width: '10' // <- width in chars (when the number is passed as string)
            },
            name_report_status: {
                displayName: 'Hanh dong',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            },
            date_back: {
                displayName: 'Ngay tra',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            },
            full_name: { // <- the key should match the actual data key
                displayName: 'Nguoi tra', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                width: 120 // <- width in pixels
            }
        }
        const dataset = await reportModel.exportGet();


        const report = excel.buildExport(
            [
                {
                    name: 'ReportBack',

                    specification: specification,
                    data: dataset
                }
            ]
        );
        res.attachment('reportBack.xlsx');
        res.send(report);
    },
    exportGet: async function (req, res) {
        const specification = {
            name_device: { // <- the key should match the actual data key
                displayName: 'Ten thiet bi', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                width: 120 // <- width in pixels
            },
            name_shelf: {
                displayName: 'Ten tu',
                headerStyle: styles.headerDark,
                width: '10' // <- width in chars (when the number is passed as string)
            },
            name_report_status: {
                displayName: 'Hanh dong',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            },
            date_rent: {
                displayName: 'Ngay lay',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            },
            full_name: { // <- the key should match the actual data key
                displayName: 'Nguoi lay', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                width: 120 // <- width in pixels
            }
        }
        const dataset = await reportModel.exportGet();


        const report = excel.buildExport(
            [
                {
                    name: 'ReportGet',

                    specification: specification,
                    data: dataset
                }
            ]
        );
        res.attachment('reportGet.xlsx');
        res.send(report);
    },
    deviceRemaining:async function(req,res){
        const limit = 10;
        let page = req.query.page || 1;
        if (page < 0) {
            page = 1;
        }
        let offset = (page - 1) * limit;
        var rest = [];
        rest = await reportModel.deviceRemaining(limit, offset);
        var allPage = await reportModel.pageRemaining();
        const nTrang = Math.ceil(allPage/limit);
        let pages_item = [];
        for (let i = 1; i <= nTrang; i++) {
            const item = {
                value: i,
                isActive: i == page
            }
            pages_item.push(item);
        }
        res.render('report/rest',{ 
            rest,
            pages_item,
            next: +page + 1,
            prev: +page - 1,
            can_go_prev: page <= 1,
            can_go_next: page >= nTrang,
        })
    }
}
module.exports = reportCtl;