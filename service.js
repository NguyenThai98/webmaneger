require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const http = require('http').createServer(app);
const auth = require('./middlewares/auth.mdw');
const io = require('socket.io')(http);
const path = require('path');
require('express-async-errors');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static('public'));

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

io.on('connection', (socket) => {
    socket.on('CLIENT_BORROW_DEVICE', (data) => {
        io.sockets.emit('SERVER_SEND_AUTH_BORROW', `Tài khoản ${data.full_name} vừa mượn ${data.name_device}`);
    })
})
app.use('/user', require('./routers/user.router'));
app.use('/admin', require('./routers/admin.router'));
app.use('/device', require('./routers/device.router'));
app.use('/report', require('./routers/report.router'));
app.use('/api', require('./routers/excel.router'));
app.use('/menu', require('./routers/menu.router'));
app.get('/', function (req, res) {

    res.render('home/home');
});
app.use(express.urlencoded({ extended: true }));
if(process.env.NODE_ENV === 'production'){
    
}
const PORT = process.env.PORT || 7000;
http.listen(PORT, () => {
    console.log(`start sever at port http://localhost:${PORT}`);
})