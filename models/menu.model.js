const db = require('../utils/db');
const TBL_PRODUCT = 'product';
const TBL_DEVICE = 'device';

module.exports = {
    loadMenu: function (id, table) {
        if (table == TBL_PRODUCT) {
            return db.load(`select * from ${TBL_PRODUCT} where id_category = ${id}`);
        } else if (table == TBL_DEVICE) {
            return db.load(`select * from ${TBL_DEVICE} where id_product = ${id}`);
        }
    }
}