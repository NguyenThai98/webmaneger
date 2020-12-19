const excelModel = require('../models/excel.model');
const multer = require('../config/multer');
const readXlsxFile = require('read-excel-file/node');
const excelCtrl = {
    importList: async(req,res) =>{
        await excelModel.importList(__basedir + '/uploads/' + req.file.filename);
        res.json({msg: "hahha"});
    }
}
module.exports = excelCtrl;