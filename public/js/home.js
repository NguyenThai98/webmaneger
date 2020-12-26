const socket = io();
let notification = document.querySelector('.notification');
let left_device = document.querySelector('.left_device');
socket.on('SERVER_SEND_AUTH_BORROW', (data) => {
    notification.innerText = data;
    left_device.style.display = 'block';
    setTimeout(function () {
        left_device.style.display = 'none';
    }, 3000);
})