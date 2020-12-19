const bcryptjs = require('bcryptjs');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const open = require('open');
const deviceModel = require('../models/device.model');
const reportModel = require('../models/report.model');
const shelfModel = require('../models/shelf.model');
const roleModle = require('../models/role.model');
const accountRoleModle = require('../models/account_role.model');
const userCtl = {
    register: async function (req, res) {
        try {
            const { full_name, password, user_name, rfid } = req.body;
            if (!full_name || !user_name || !rfid) return res.status(400).json({ msgErr: "Please full all fields" });
            if (password.length < 6) return res.status(400).json({ msgErr: "Password must less than 6 characters" });
            const user = await userModel.findUser(user_name, rfid);
            if (user) return res.status(400).json({ msgErr: "Account already exists" });
            const pwHash = await bcryptjs.hash(password, 12);
            const totalRole = await roleModle.totalRole();
            const entity = {
                full_name,
                password: pwHash,
                user_name,
                rfid: rfid,
            }
            await userModel.addUser(entity);
            const id_account = await userModel.selectIdUser(rfid);
            console.log(id_account);
            if (id_account) {
                for (let index = 1; index <= totalRole; index++) {
                    let entityy = {};
                    if (index == 1) {
                        entityy = {
                            id_account,
                            id_role: index,
                            status_account: 1
                        }
                    } else {
                        entityy = {
                            id_account,
                            id_role: index,
                            status_account: 0
                        }
                    }
                    await accountRoleModle.insert_account_role(entityy);
                }
            } else {
                return res.json({ msgErr: "Tài khoản chưa đăng ký." });
            }
            return res.json({ successMsg: "Register success." });
        } catch (err) {
            return res.json({ errorMsg: err.message });
        }
    },
    loginRFID: async function (req, res) {
        try {
            const { rfid } = req.body;
            if (!rfid) {
                return res.json({ msgErr: "Vui lòng nhập RFID." })
            } else {
                const user = await userModel.findUser_RFID(rfid);
                if (!user) return res.status(400).json({ msgErr: "RFID không tồn tại." });
                if (user) {
                    req.session.isAuthenticated = true;
                    req.session.authUser = user;
                    res.json({ msgSuccess: "Đăng nhập thành công." });
                }
            }
        } catch (error) {
            return res.json({ msgErr: error.message });
        }
    },
    ScanRFID: async function (req, res) {
        const { rfid } = req.body;
        let a_RFID = [];
        let checkUs = false;
        let rfid_login = "null";
        if (rfid.length > 0) {
            for (let index = 0; index < rfid.length; index++) {
                if (checkUs == false) {
                    const user = await userModel.findUser_RFID(rfid[index]);
                    if (user) {
                        rfid_login = rfid[index];
                        checkUs = true;
                        rfid.splice(index, 1);
                    }
                }
                if (rfid_login != rfid[index]) {
                    a_RFID.push(rfid[index]);
                }

            }
            let stringParam = "";
            for (let index = 0; index < a_RFID.length; index++) {
                stringParam += '/' + a_RFID[index];
            }
            open(`${process.env.URL}/user/get_rfid/${rfid_login}${stringParam}`);
            return res.json({ msg: "Scan RFID done." });
        } else {
            return res.json({ msgErr: "No RFID." });
        }
    },
    login: async function (req, res) {
        try {
            const { user_name, password } = req.body;
            if (!user_name) return res.status(400).json({ msgErr: "Please full all fields" });
            const user = await userModel.findUser(user_name, null);
            if (!user) return res.status(400).json({ msgErr: "Username not exists" });
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msgErr: "Password incorrect" });
            req.session.isAuthenticated = true;
            req.session.authUser = user;
            return res.json({ msgSuccess: "Login success." });
        } catch (error) {
            return res.json({ msg: error.message });
        }
    },
    profile: async function (req, res) {
        res.render('user/profile');
    },
    logout: function (req, res) {
        try {
            req.session.isAuthenticated = false;
            req.session.authUser = null;
            res.redirect('/user/login');
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAccount: async function (req, res) {
        try {
            const { rfid } = req.body;
            const user = await userModel.findUser_RFID(rfid);
            if (user) {
                return res.json(user);
            } else {
                return res.json({ msgErr: "Tài khoản không tồn tại." });
            }
        } catch (error) {
            return res.json({ msg: error.message });
        }
    },
    changePwAccount: async function (req, res) {
        try {
            const { rfid, password } = req.body;
            const pwHash = await bcryptjs.hash(password, 12);
            const condition = {
                rfid: rfid,
            }
            const entity = {
                password: pwHash
            }
            await userModel.updatePw(entity, condition);
            return res.json({ msgSuccess: "Thay đổi password thành công." })
        } catch (error) {
            return res.json({ msgErr: error.message });
        }

    },
    getRoleUser: async function (req, res) {
        let allRoles = [];
        try {
            const { id_account } = req.body;
            const rolesUser = await accountRoleModle.selectRoleUser(id_account);
            for (let index = 0; index < rolesUser.length; index++) {
                allRoles.push(rolesUser[index].id_role);
            }
            res.json(allRoles);
        } catch (error) {
            return res.json({ msgErr: error.message });
        }

    },
    updateAuthUser: async function (req, res) {
        try {
            const AAuth = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const aExists = [];
            const aN_Exists = [];
            const { id_account, auth } = req.body;
            for (let index = 0; index < AAuth.length; index++) {
                if (auth.includes(AAuth[index]) == true) {
                    aExists.push(AAuth[index]);
                } else {
                    aN_Exists.push(AAuth[index]);
                }
            }
            if (aExists.length > 0) {
                for (let index = 0; index < aExists.length; index++) {
                    let entity = {
                        status_account: 1,
                    }
                    await accountRoleModle.updateStatusRole(entity, +id_account, +aExists[index]);
                }

            }
            if (aN_Exists.length > 0) {
                for (let index = 0; index < aN_Exists.length; index++) {
                    let entity = {
                        status_account: 0,
                    }
                    await accountRoleModle.updateStatusRole(entity, +id_account, +aN_Exists[index]);
                }
            }
            return res.json({ msgSuccess: "Cập nhật quyền thành công." });
        } catch (error) {
            return res.json({ msgErr: error.message });
        }
    }
}
module.exports = userCtl;