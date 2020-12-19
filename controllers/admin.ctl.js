const deviceModel = require('../models/device.model');
const reportModel = require('../models/report.model');
const adminModel = require('../models/admin.model');
const adminCtl = {
    accepts: async function (req, res) {
        const allRequests = await adminModel.allRequests();
        res.render('admin/listAcceptDevice', {
            allRequests
        });
    },
    accept: async function (req, res) {
        const { date_rent, date_back, id_report, id_device } = req.body;
        if (!date_rent || !date_back || !id_report) return res.json({ msgErr: "Lỗi đăng ký đồ dùng." });
        const report = reportModel.findReport(date_rent, date_back, id_report);
        if (report) {
            let entity = {
                check_status: 'ACCEPT'
            };
            let condition = {
                id_report: id_report
            }
            await reportModel.updateReport(entity, condition);

            res.json({ msgSuccess: "Duyệt thành công" });
        } else {
            res.json({ msgErr: "Duyệt thất bại" });
        }
    },
    refuse: async function (req, res) {
        const { date_rent, date_back, id_report, id_device } = req.body;
        if (!date_rent || !date_back || !id_report) return res.json({ msgErr: "Lỗi đăng ký đồ dùng." });
        const report = reportModel.findReport(date_rent, date_back, id_report);
        if (report) {
            let entity = {
                check_status: 'REFUSE'
            };
            let condition = {
                id_report: id_report
            }
            await reportModel.updateReport(entity, condition);
            await deviceModel.updateStatus({ status: 'không khóa' }, { id_device });
            res.json({ msgSuccess: "Đã hủy đăng ký dụng cụ." });
        } else {
            res.json({ msgErr: "Hủy đăng ký dụng cụ thất bại." });
        }
    }
}
module.exports = adminCtl;