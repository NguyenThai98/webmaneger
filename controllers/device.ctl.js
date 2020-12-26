const deviceModel = require('../models/device.model');
const shelfModel = require('../models/shelf.model');
const reportModel = require('../models/report.model');
const userModel = require('../models/user.model');
const accountRoleModle = require('../models/account_role.model');
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
            res.json({ newDevices })
            // res.render('device/listDevice', { newDevices });
        }
    },
    getDevice: async (req, res) => {
        const { id } = req.body;
        const getDevice = await deviceModel.findDevice(id);
        if (getDevice.status == 0) {
            res.json(getDevice);
        } else if (getDevice.status == 1) {
            const getDeviceBr = await deviceModel.findDeviceBR(getDevice.id_device);
            res.json(getDeviceBr);
        } else {
            return res.status(400).json({ msgErr: "Dụng cụ không tồn tại." })
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
        try {
            //let listUserAuthBorrow = await accountRoleModle.listUserAuthBorrow();
            const io = req.app.get('socketio');
            const { rfid, note_report, date_rent } = req.body;
            const { id_account } = res.locals.lcAuthUser;
            if (!date_rent) return res.status(400).json({ msgErr: "Chưa Nhập Ngày Mượn" });
            const device = await deviceModel.findDeviceRFID(rfid);
            const shelf = await deviceModel.selectSlot(device.id_device);
            const entityReport = {
                total_slot: shelf.total_slot > 0 ? shelf.total_slot - 1 : 0,
                total_slotEmpty: shelf.total_slotEmpty + 1
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
                id_report_status: 1
            };
            await reportModel.insertReport(newReport);
            await deviceModel.updateStatus({ status: 1 }, { rfid });
            res.json({ msgSuccess: "Mượn Thành Công." });

        } catch (error) {
            return res.status(400).json({ msgErr: error.message });
        }
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
    },
    addDevice: async function (req, res) {
        const io = req.app.get('socketio');
        io.on('connection', (socket) => {
            console.log(socket.id);
        })
        const { name_device, id_product, rfid, pos } = req.body;
        const { filename, size, mimetype } = req.file;
        let maxSizeImg = 1024 * 1024;
        if (size && size > maxSizeImg) {
            console.log("kích thước lớn.");
        }
        if (mimetype != 'image/png' || mimetype != 'image/jpg' || mimetype != 'image/jpeg') {
            console.log("Only .png, .jpg and .jpeg format allowed!");
        }
        let arrPos = pos.split('/');
        let pos_x = arrPos[0];
        let pos_y = arrPos[1];
        const dataDevice = {
            name_device, id_product, rfid, pos_x, pos_y, image: filename
        }
        console.log(dataDevice);
        try {
            await deviceModel.addDevice(dataDevice);
            res.json({ msgSuccess: "Thêm dụng cụ thành công." });
        } catch (error) {
            return res.status(400).json({ msgErr: error.message });
        }
    }
}
module.exports = deviceCtl;