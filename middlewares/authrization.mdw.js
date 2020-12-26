const accountRoleModle = require('../models/account_role.model');

module.exports = {
    MUON_TRA: async function (req, res, next) {
        const role_accounts = await accountRoleModle.selectRoleUser(res.locals.lcAuthUser.id_account);
        for (let index = 0; index < role_accounts.length; index++) {
            if (role_accounts[index].name_role == 'MUON_TRA' && role_accounts[index].status_account == 1) {
                next();
            } else {
                return res.render('notification/denied');
            }
        }
    },
    THEM_DUNG_CU: async function (req, res, next) {
        const role_accounts = await accountRoleModle.selectRoleUser(res.locals.lcAuthUser.id_account);
        for (let index = 0; index < role_accounts.length; index++) {
            if (role_accounts[index].id_role == 4 && role_accounts[index].status_account == 1) {
                next();
            }  
        }
        return res.render('notification/denied');
    }
}