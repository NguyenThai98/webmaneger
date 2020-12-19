require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const PORT = 7000;

const auth = require('./middlewares/auth.mdw');
require('express-async-errors');

app.use(express.json());
app.use(cookieParser());

 
require('./middlewares/session.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/locals.mdw')(app);
app.use('/public', express.static('public'));
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('500', {
        layout: false
    });
})
app.use('/user', require('./routers/user.router'));
app.use('/admin', require('./routers/admin.router'));
app.use('/device', require('./routers/device.router'));
app.use('/report', require('./routers/report.router'));
app.use('/api', require('./routers/excel.router'));
app.get('/', function (req, res) {
    res.render('home/home');
})


app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`start sever at port http://localhost:${PORT}`);
})