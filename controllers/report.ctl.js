const reportModel = require('../models/report.model');
const excel = require('node-excel-export');
const userModel = require('../models/user.model');
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
            // res.json(allReport);
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
    }
}
module.exports = reportCtl;