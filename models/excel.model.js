const db = require('../utils/db');
const TBL_DEVICE = 'device';
const readXlsxFile = require('read-excel-file/node');

module.exports = {
  importList: function (filePath) {
    readXlsxFile(filePath).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.   
      console.log(rows)
    });
    rows.shift();
    let query = `INSERT INTO customer (id_device, name_device, id_product, parameter) VALUES ?`;
    db.connection.query(query, [rows]);
  }
}
