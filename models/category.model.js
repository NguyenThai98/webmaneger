const db = require('../utils/db');
const TBL_CATEGORY = 'category';
module.exports = {
    selectMenu: function () {
        return db.load(`select * from ${TBL_CATEGORY}`);
    }
}