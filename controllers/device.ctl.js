const deviceModel = require('../models/device.model');
const shelfModel = require('../models/shelf.model');
const reportModel = require('../models/report.model');
const userModel = require('../models/user.model');
const deviceCtl = {
    getAllDevice: async (req, res) => {
        const allDevices = await deviceModel.all();
        const { role_account } = res.locals.lcAuthUser;
        let newDevices = [];
        for (let index = 0; index < allDevices.length; index++) {
            const item = {
                device: allDevices[index],
                isPremium: allDevices[index].role == 0 ? false : true,
            }
            newDevices.push(item);
        }
        if (role_account) {
            //res.json({newDevices})
            res.render('device/listDevice', { newDevices });
        }
    },
    getDevice: async (req, res) => {
        const { rfid } = req.body;
        const getDevice = await deviceModel.getDevice(rfid);
        if (!getDevice) {
            const device = await deviceModel.findDevice(rfid);
            res.json(device);
        } else {
            res.json(getDevice);
        }

    },
    getRfid: (req, res) => {
        const { rfid } = req.params;
        const devide = deviceModel.findDevice(rfid);
        if (devide) {
            res.render('device/editDevice', { devide });
        } else {
            res.render('device/addDevice', { rfid });
        }
    },
    editDevice: async (req, res) => {
        const { id } = req.params;
        const device = await deviceModel.findDevice(id);
        res.render('device/editDevice', { device });
    },
    getBorrow: async (req, res) => {
        const { rfid, date_rent, note_report } = req.body;
        const { role_account, id_account } = res.locals.lcAuthUser;

        if (!date_rent) return res.status(400).json({ msgErr: "Chưa Nhập Ngày Mượn" });

        const device = await deviceModel.findDevice(rfid);
        if (+device.role > role_account) {
            return res.status(400).json({ msgErr: "Bạn Không đủ quyền mượn." });
        }
        const shelf = await deviceModel.selectSlot(device.id_device);
        const entityReport = {
            total_slot: shelf.total_slot > 0 ? shelf.total_slot - 1 : 0,
            blank: shelf.blank + 1
        }
        const conditionReport = {
            id_shelf: shelf.id_shelf
        }
        await shelfModel.updateShelf(entityReport, conditionReport);
        let newReport = {
            id_account,
            id_device: device.id_device,
            date_rent,
            note_report: note_report || "",
            check_status: "BORROW"
        };
        await reportModel.insertReport(newReport);
        await deviceModel.updateStatus({ status: 'khóa' }, { rfid });
        res.json({ msgSuccess: "Mượn Thành Công." });
    },
    historyUserTakeTool: async function (req, res) {
        const { id } = req.params;
        const listUserTakenTool = await deviceModel.selectUserTakenTool(id);
        res.json(listUserTakenTool);
    },
    historyAllUserTakeTool: async function (req, res) {
        const { name_device } = req.body;
        const historyAllUserTakeTool = await deviceModel.historyTakenTool(name_device);
        res.json(historyAllUserTakeTool);
    },
    getProduct: async function (req, res) {
        const { id_product } = req.params;
        if (id_product) {
            const products = await deviceModel.getProduct(id_product);
            res.render('device/listProducts', products);
        }
    },
    takenTool: async function (req, res) {
        const { date_rent, date_back, note_report, rfid } = req.body;
        if (!date_rent || !date_back) return res.status(400).json({ msgErr: "Bạn Chưa Nhập ngày mượn và ngày trả" });
        if (!note_report) return res.status(400).json({ msgErr: "Bạn chưa nhập lý do lấy." });
        const { role_account, id_account } = res.locals.lcAuthUser;
        const device = await deviceModel.findDevice(rfid);
        if (+device.role > role_account) {
            return res.status(400).json({ msgErr: "Bạn Không đủ quyền mượn." });
        }
        const shelf = await deviceModel.selectSlot(device.id_device);
        const entityReport = {
            total_slot: shelf.total_slot > 0 ? shelf.total_slot - 1 : 0,
            blank: shelf.blank + 1
        }
        const conditionReport = {
            id_shelf: shelf.id_shelf
        }
        await shelfModel.updateShelf(entityReport, conditionReport);
        let newReport = {
            id_account,
            id_device: device.id_device,
            date_rent,
            date_back,
            note_report: note_report || "",
            check_status: "TAKEN"
        };
        await reportModel.insertReport(newReport);
        await deviceModel.updateStatus({ status: 'khóa' }, { rfid });
        res.json({ msgSuccess: "Mượn thành công." });
    },
    registerTool: async function (req, res) {
        const { rfid, date_rent, date_back, note_report } = req.body;
        if (!rfid || !date_rent || !date_back || !note_report) return res.status(400).json({ msgErr: "Bạn vui lòng điền đủ thông tin." })
        const { role_account, id_account } = res.locals.lcAuthUser;
        const device = await deviceModel.findDevice(rfid);
        let newReport = {
            id_account,
            id_device: device.id_device,
            date_rent,
            date_back,
            note_report: note_report || "",
            check_status: "REGISTER"
        };
        await reportModel.insertReport(newReport);
        await deviceModel.updateStatus({ status: 'khóa' }, { rfid });
        res.json({ msgSuccess: "Register tool success." });
    }
}
module.exports = deviceCtl;