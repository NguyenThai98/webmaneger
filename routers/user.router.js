const router = require('express').Router();
const auth = require('../middlewares/auth.mdw');
const userCtl = require('../controllers/user.ctl');
const restrict = require('../middlewares/auth.mdw');
const deviceModel = require('../models/device.model');
const accountRoleModle = require('../models/account_role.model');
const userModel = require('../models/user.model');
const open = require('open');
router.get('/login', function (req, res) {
    res.render('auth/login');
})
router.get('/loginRFID', function (req, res) {
    res.render('auth/LoginRFID');
});
router.post('/getAccount', userCtl.getAccount); //n
router.post('/changePwAccount', userCtl.changePwAccount); // n
router.post('/getRoleUser',userCtl.getRoleUser); // n
router.post('/RFID_Register', function (req, res) {
    const { rfid } = req.body;
    if (rfid) {
        open(`${process.env.URL}/user/register/${rfid}`);
        res.json({ msgSuccess: "Quét rfid thành công." })
    } else {
        res.json({ msgErr: "RFID incorrect." });
    }
}) //n
router.get('/register/:rfid', function (req, res) {
    const { rfid } = req.params;
    if (rfid) {
        res.render('auth/register', { rfid });
    } else {
        res.render('auth/register');
    }
}) //n
router.post('/register', userCtl.register);
router.post('/login', userCtl.login);
router.post('/loginRFID', userCtl.loginRFID);
router.post('/scan_rfid', userCtl.ScanRFID); // n
router.get('/get_rfid/*', async (req, res) => {
    let params = req.params['0'].split('/');
    let exRFID = [];
    let nExRFID = [];
    let role_accounts = [];
    let rfid_account = '';
    for (let index = 0; index < params.length; index++) {
        if (index == 0 && params[0] != 'null') {
            rfid_account = params[index];
        } else {
            if (rfid_account != "") {
                const user = await userModel.findUser_RFID(rfid_account);
                role_accounts = await accountRoleModle.selectRoleUser(user.id_account);
                const deviceItem = await deviceModel.findDevice(params[index]);
                if (deviceItem) {
                    for (let index = 0; index < role_accounts.length; index++) {
                        if (role_accounts[index].name_role == 'THEM_DUNG_CU' && role_accounts[index].status_account == 1) {
                            deviceItem.THEM_DUNG_CU = true;
                        }
                        if (role_accounts[index].name_role == 'TAO_TAI_KHOAN' && role_accounts[index].status_account == 1) {
                            deviceItem.TAO_TAI_KHOAN = true;
                        }
                        if (role_accounts[index].name_role == 'MUON_TRA' && role_accounts[index].status_account == 1) {
                            deviceItem.MUON_TRA = true;
                        }
                    }

                    exRFID.push(deviceItem);
                } else {
                    const item = {
                        value: params[index]
                    };
                    nExRFID.push(item);
                }
            } else {
                const deviceItem = await deviceModel.findDevice(params[index]);
                if (res.locals.lcAuthUser) {
                    const role_accounts = await accountRoleModle.selectRoleUser(res.locals.lcAuthUser.id_account);
                    if (deviceItem) {
                        for (let index = 0; index < role_accounts.length; index++) {
                            if (role_accounts[index].name_role == 'THEM_DUNG_CU' && role_accounts[index].status_account == 1) {
                                deviceItem.THEM_DUNG_CU = true;
                            }
                            if (role_accounts[index].name_role == 'MUON_TRA' && role_accounts[index].status_account == 1) {
                                deviceItem.MUON_TRA = true;
                            }
                            if (role_accounts[index].name_role == 'TAO_TAI_KHOAN' && role_accounts[index].status_account == 1) {
                                deviceItem.TAO_TAI_KHOAN = true;
                            }
                        }
                        exRFID.push(deviceItem);
                    } else {
                        const item = {
                            value: params[index]
                        };
                        nExRFID.push(item);
                    }
                } else {
                    if (deviceItem) {
                        exRFID.push(deviceItem);
                    } else {
                        const item = {
                            value: params[index]
                        };
                        nExRFID.push(item);
                    }

                }
            }

        }
    }
    return res.render('home/showRFID', {
        rfid_account, exRFID, nExRFID
    });
}) // n
router.get('/info', auth, userCtl.profile);
router.get('/logout', userCtl.logout);
router.get('/login_rfid/*', (req, res) => {
    let params = req.params['0'].split('/');
    let allRFID = [];
    for (let index = 0; index < params.length; index++) {
        const item = {
            value: params[index]
        }
        allRFID.push(item);
    }
    res.render('auth/loginRFID', { allRFID });
});
router.post('/updateAuthUser', userCtl.updateAuthUser)



module.exports = router;