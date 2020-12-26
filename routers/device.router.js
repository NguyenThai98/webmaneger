const router = require('express').Router();
const deviceCtl = require('../controllers/device.ctl');
const auth = require('../middlewares/auth.mdw');
const authorization = require('../middlewares/authrization.mdw');
const multer = require('multer');
const upload = multer({
    dest: 'public/img/'
});
router.get('/addDevice', auth, authorization.THEM_DUNG_CU, (req, res) => {
    res.render('device/addDevice');
}); // n
router.post('/addDevice', upload.single('image'), deviceCtl.addDevice); // n
router.get('/importList', (req, res) => {
    res.render('device/importList');
}); // n
router.get('/checkShelf', (req, res) => {
    res.render('device/checkShelf');
}); // n


router.get('/', auth, deviceCtl.getAllDevice);
router.post('/get-device', deviceCtl.getDevice);
router.get('/get-rfid/:rfid', deviceCtl.getRfid);
router.post('/get-borrow', deviceCtl.getBorrow);// n
router.get('/historyTakenTool/:id', auth, deviceCtl.historyUserTakeTool);
router.post('/taken-tool', auth, deviceCtl.takenTool);
router.post('/register-tool', auth, deviceCtl.registerTool);
router.post('/historyAllTool', auth, deviceCtl.historyAllUserTakeTool);
router.get('/registerDevice', (req, res) => {
    res.render('device/registerDevice');
});
router.get('/login_rfid_device/*', (req, res) => {
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
//1
router.get('/borrowDevice', (req, res) => {
    res.render('device/borrowDevice__n');
});
module.exports = router;