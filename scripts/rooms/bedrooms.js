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
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[4].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[6].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[7].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[8].firstElementChild.insertAdjacentHTML("afterend", option);
}
/* ALARM */

/* FAN */
document.addEventListener("DOMContentLoaded", function() {
    const fanOnBtn = document.getElementById("fan-on");
    const fanOffBtn = document.getElementById("fan-off");
    const fanSpeedSlider = document.getElementById("fan-speed");
    const fanStatusText = document.getElementById("fan-status");

    fanOnBtn.addEventListener("click", function() {
        fanStatusText.innerText = "Fan is ON. Speed: " + fanSpeedSlider.value;
    });

    fanSpeedSlider.addEventListener("input", function() {
        fanStatusText.innerText = "Fan is ON. Speed: " + fanSpeedSlider.value;
    });

    fanOffBtn.addEventListener("click", function() {
        fanStatusText.innerText = "Fan is OFF";
    });
});
/* FAN */

/* LAMP */
document.addEventListener("DOMContentLoaded", function() {
    const lampRedBtn = document.getElementById("lamp-red");
    const lampBlueBtn = document.getElementById("lamp-blue");
    const lampGreenBtn = document.getElementById("lamp-green");

    lampRedBtn.addEventListener("click", function() {
        toggleBrightness(lampRedBtn, [lampBlueBtn, lampGreenBtn]);
    });

    lampBlueBtn.addEventListener("click", function() {
        toggleBrightness(lampBlueBtn, [lampRedBtn, lampGreenBtn]);
    });

    lampGreenBtn.addEventListener("click", function() {
        toggleBrightness(lampGreenBtn, [lampRedBtn, lampBlueBtn]);
    });

    function toggleBrightness(clickedBtn, otherBtns) {
        if (allButtonsNormal() == false) {
            if (clickedBtn.style.opacity === "1") {
                otherBtns.forEach(btn => {
                    btn.style.opacity = "1";
                });
            } else {
                clickedBtn.style.opacity = "1";
                otherBtns.forEach(btn => {
                    btn.style.opacity = "0.5";
                });
            }
        } else {
            otherBtns.forEach(btn => {
                btn.style.opacity = "0.5";
            });
        }
    }

    function allButtonsNormal() {
        if (lampRedBtn.style.opacity === "1" && lampBlueBtn.style.opacity === "1" && lampGreenBtn.style.opacity === "1") {
            return true;
        } else {
            return false;
        }
    }
});
/* LAMP */

/* BED LIGHT */
const bedLightStatus = document.getElementById("bed-light-status");
const bedLightControlBtn = document.querySelector(".bed-light-control .control-btn-bed");
let bedLightOn = false;

bedLightControlBtn.addEventListener("click", function() {
    bedLightOn = !bedLightOn;
    bedLightStatus.textContent = bedLightOn ? "On" : "Off";
    bedLightControlBtn.textContent = bedLightOn ? "Turn Bed Light Off" : "Turn Bed Light On";
});
/* BED LIGHT */

/* TV */
const tvStatus1 = document.getElementById("tv-status");
const tvControlBtn1 = document.querySelector(".tv-control-1 .control-btn");
let tvOn1 = false;

tvControlBtn1.addEventListener("click", function() {
    tvOn1 = !tvOn1;
    tvStatus1.textContent = tvOn1 ? "On" : "Off";
    tvControlBtn1.textContent = tvOn1 ? "Turn TV Off" : "Turn TV On";
});

const tvStatus2 = document.getElementById("tv-status-2");
const tvControlBtn2 = document.querySelector(".tv-control-2 .control-btn-2");
let tvOn2 = false;

tvControlBtn2.addEventListener("click", function() {
    tvOn2 = !tvOn2;
    tvStatus2.textContent = tvOn2 ? "On" : "Off";
    tvControlBtn2.textContent = tvOn2 ? "Turn TV Off" : "Turn TV On";
});
/* TV */
