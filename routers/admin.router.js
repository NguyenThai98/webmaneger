const router = require('express').Router();
const auth = require('../middlewares/auth.mdw');
const isAdmin = require('../middlewares/isAdmin.mdw');
const adminCtl = require('../controllers/admin.ctl');
const userModel = require('../models/user.model');
router.get('/addDevice', auth, isAdmin, (req, res) => {
    const { rfid, name_device, length_device } = req.body;
    let data = {
        rfid: rfid ? rfid : "", name_device: name_device ? name_device : "", length_device: length_device ? length_device : "",
    };
    res.render('device/addDevice', { data });
});
router.get('/accepts', adminCtl.accepts);
router.post('/accept', adminCtl.accept);
router.post('/refuse', adminCtl.refuse);

router.get('/auth', async (req, res) => {
    const all_accounts = await userModel.allUser();
    res.render('auth/authorization', { all_accounts });
});
module.exports = router;