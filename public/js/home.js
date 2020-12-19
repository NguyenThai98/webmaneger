let open_key = document.querySelector('.open_key');
let open_shelf = document.querySelector('.open_shelf');
let open_shelf__ = document.querySelector('.open_shelf__');
let key_shelf = document.querySelector('.key_shelf');
let allMenu = document.querySelectorAll('.col-9 .menu > li');
let allbtn = document.querySelectorAll('.btn_device');

allMenu.forEach((item, index) => {
    item.addEventListener('click', () => {
        let active = item.parentNode.querySelector('.actived');
        if (active) {
            active.classList.remove('actived');
        }

        item.classList.add('actived');
    })
})
allbtn.forEach((item, index) => {
    item.addEventListener('click', () => {
        let active_btn = item.parentNode.querySelector('.active_btn');
        if (active_btn) {
            active_btn.classList.remove('active_btn');
        }
        item.classList.add('active_btn');
    })
})

if (open_key) {
    open_key.addEventListener('click', function () {
        open_shelf.style.left = "100%";
        open_shelf__.style.right = "100%";
        key_shelf.style.visibility = "hidden";
        key_shelf.style.display = "none";

    })
}

let hideListTaken = document.querySelector('.list-taken');
if (hideListTaken) {
    hideListTaken.addEventListener('click', function () {
        hideListTaken.style.visibility = 'hidden';
        $(".tbody_his_taken").html('');
    })
}
