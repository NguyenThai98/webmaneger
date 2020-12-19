const db = require('../utils/db');
module.exports = {
    allRequests: () => {
        return db.load(`SELECT * from report r JOIN device d on r.id_device = d.id_device join account a on r.id_account = a.id_account WHERE r.check_status = 'REGISTER';
        `);
    }
}