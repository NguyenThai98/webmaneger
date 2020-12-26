const router = require('express').Router();
const menuCtrl = require('../controllers/menu.ctl');
router.post('/Submenu', menuCtrl.selectChildMenu);
module.exports = router;