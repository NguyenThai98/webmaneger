const menuModel = require('../models/menu.model');

const menuCtrl = {
    selectChildMenu: async function (req, res) {
        const { id, table } = req.body;
        const subMenu = await menuModel.loadMenu(id, table);
        res.json(subMenu);
    }
}

module.exports = menuCtrl;