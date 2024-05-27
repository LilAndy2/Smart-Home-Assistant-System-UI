document.getElementById('curtains-open-1').addEventListener('click', function() {
    setTimeout(() => {
        alert('Curtains have been opened in Bedroom 1');
    }, 20000);
});

document.getElementById('curtains-close-1').addEventListener('click', function() {
    setTimeout(() => {
        alert('Curtains have been closed in Bedroom 1');
    }, 20000);
});

document.getElementById('curtains-open-2').addEventListener('click', function() {
    setTimeout(() => {
        alert('Curtains have been opened in Bedroom 2');
    }, 20000);
});

document.getElementById('curtains-close-2').addEventListener('click', function() {
    setTimeout(() => {
        alert('Curtains have been closed in Bedroom 2');
    }, 20000);
});


/* ALARM */
const selectMenu = document.querySelectorAll("select");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[4].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[5].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[6].firstElementChild.insertAdjacentHTML("afterend", option);
}
/* ALARM */
