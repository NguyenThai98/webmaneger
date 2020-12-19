const router = require('express').Router();
const reportCtl = require('../controllers/report.ctl');
const auth = require('../middlewares/auth.mdw');

router.get('/', auth, reportCtl.getAllReport);
router.get('/historyUser', auth, reportCtl.getReportOne);
router.get('/exports', reportCtl.export);
router.get('/allHistory', (req, res) => {
    res.render('report/allHistory');
}); // n
module.exports = router;