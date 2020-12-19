const router = require('express').Router();
const excelCtrl = require('../controllers/excel.ctl');
const multer = require('../config/multer')
const auth = require('../middlewares/auth.mdw');

router.post('/uploadfile',multer.single("uploadfile"), excelCtrl.importList);
module.exports = router;